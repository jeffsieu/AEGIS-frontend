import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button } from '@mui/material';
import {
  RequiredScheduleItemProps,
  ScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, Role } from '@typing';
import { useParams } from 'react-router-dom';
import {
  useGetMemberAvailabilitiesForMonthQuery,
  useGetRolesQuery,
  useGetSchedulesForMonthQuery,
  useUpdateScheduleMutation,
} from '@services/backend';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import EmptyHint from '@components/general/empty-hint';
import { ERROR_NO_SCHEDULE_FOUND } from '@utils/constants/string';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Backend } from '@typing/backend';

export type PlannerDraftEditorPageProps = {
  startDate: Date;
  endDate: Date;
  roles: Role[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
  onMemberSelected: (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => void;
  onPublishClick: () => void;
  onSaveClick: () => void;
};

function PlannerDraftEditorPageWithAPI() {
  const { month } = useParams();
  const [publishDraft] = useUpdateScheduleMutation();

  return buildWithApiQueries({
    queries: {
      schedules: useGetSchedulesForMonthQuery({
        month: month!,
        isPublished: false,
      }),
      roles: useGetRolesQuery(),
      memberAvailabilities: useGetMemberAvailabilitiesForMonthQuery(
        dayjs(`${month}-01`).toDate()
      ),
    },
    onSuccess: ({ roles, memberAvailabilities, schedules }) => {
      if (schedules.length === 0) return <>No records for {month} found</>;

      const updateDraft =
        (isPublished: boolean) =>
        (scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][]) => {
          const duties: Backend.Duty[] = scheduleItemsByDay
            .flatMap((scheduleItems, dayIndex) => {
              const date = dayjs(month)
                .date(dayIndex + 1)
                .format('YYYY-MM-DD');
              return scheduleItems.map((scheduleItem, roleIndex) => ({
                ...scheduleItem,
                date: date,
                roleId: roles[roleIndex].id,
              }));
            })
            .filter((scheduleItem) => scheduleItem.assignedMember !== null)
            .map((scheduleItem) => ({
              memberId: memberAvailabilities.find(
                (member) =>
                  member.callsign === scheduleItem.assignedMember!.callsign
              )!.id,
              roleId: scheduleItem.roleId,
              date: scheduleItem.date,
            }));

          publishDraft({
            month: dayjs(month).format('YYYY-MM-DD'),
            isPublished: isPublished,
            duties,
          });
        };

      const draft = schedules[0];
      const props = {
        ...scheduleToScheduleTableProps(
          draft,
          roles,
          memberAvailabilities,
          memberAvailabilities
        ),
        onPublished: updateDraft(true),
        onSaved: updateDraft(false),
      };

      return <PlannerDraftEditorPageWithState {...props} />;
    },
    onError: () => <EmptyHint>{ERROR_NO_SCHEDULE_FOUND}</EmptyHint>,
  });
}

function PlannerDraftEditorPageWithState(
  props: Pick<
    PlannerDraftEditorPageProps,
    'startDate' | 'endDate' | 'roles' | 'scheduleItemsByDay'
  > & {
    onPublished: (
      scheduleItemsByDay: PlannerDraftEditorPageProps['scheduleItemsByDay']
    ) => void;
    onSaved: (
      scheduleItemsByDay: PlannerDraftEditorPageProps['scheduleItemsByDay']
    ) => void;
  }
) {
  const {
    startDate,
    roles,
    scheduleItemsByDay: serverScheduleItemsByDay,
    onSaved,
    onPublished,
  } = props;
  const [scheduleItemsByDay, setScheduleItemsByDay] = useState(
    serverScheduleItemsByDay
  );

  const onMemberSelected = (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => {
    const memberDayIndex = dayjs(date).diff(dayjs(startDate), 'day');
    const memberRoleIndex = roles.findIndex((r) => r.name === role.name);
    const oldMember =
      scheduleItemsByDay[memberDayIndex][memberRoleIndex].assignedMember;
    const oldMemberDutyCount = oldMember?.dutyCount;
    const updatedOldMember: AvailableQualifiedMember | null =
      oldMember !== null
        ? { ...oldMember, dutyCount: oldMemberDutyCount! - 1 }
        : null;
    const updatedMember =
      member !== null ? { ...member, dutyCount: member.dutyCount + 1 } : null;

    if (updatedOldMember?.callsign === updatedMember?.callsign) {
      return;
    }

    const newScheduleItemsByDay = scheduleItemsByDay.map(
      (scheduleItems, dayIndex) =>
        scheduleItems.map((scheduleItem, roleIndex) => {
          const scheduleItemMember = scheduleItem.assignedMember;
          const isSelectedField =
            dayIndex === memberDayIndex && roleIndex === memberRoleIndex;

          const getUpdatedScheduleItemMember = () => {
            if (isSelectedField) {
              return updatedMember;
            }
            if (scheduleItemMember === null) {
              return null;
            }
            if (scheduleItemMember.callsign === updatedOldMember?.callsign) {
              return updatedOldMember;
            }
            if (scheduleItemMember.callsign === updatedMember?.callsign) {
              return updatedMember;
            }
            return scheduleItemMember;
          };

          const updatedScheduleItemMember = getUpdatedScheduleItemMember();

          return {
            ...scheduleItem,
            ...(scheduleItem.isRequired
              ? {
                  qualifiedMembers: scheduleItem.qualifiedMembers?.map(
                    (qualifiedMember) =>
                      qualifiedMember.callsign === updatedOldMember?.callsign
                        ? updatedOldMember
                        : qualifiedMember.callsign === updatedMember?.callsign
                        ? updatedMember
                        : qualifiedMember
                  ),
                }
              : {}),
            assignedMember: updatedScheduleItemMember,
          } as ScheduleItemProps;
        })
    );
    setScheduleItemsByDay(newScheduleItemsByDay);
  };

  const onPublishClick = () => {
    onPublished(scheduleItemsByDay);
  };

  const onSaveClick = () => {
    onSaved(scheduleItemsByDay);
  };

  return (
    <PlannerDraftEditorPage
      {...props}
      scheduleItemsByDay={scheduleItemsByDay}
      onMemberSelected={onMemberSelected}
      onPublishClick={onPublishClick}
      onSaveClick={onSaveClick}
    />
  );
}

function PlannerDraftEditorPage(props: PlannerDraftEditorPageProps) {
  const {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay,
    onMemberSelected,
    onPublishClick,
    onSaveClick,
  } = props;

  const totalRequiredItemsCount = scheduleItemsByDay.reduce(
    (acc, dayScheduleItems) =>
      acc + dayScheduleItems.filter(({ isRequired }) => isRequired).length,
    0
  );

  const filledRequiredItemsCount = scheduleItemsByDay.reduce(
    (acc, dayScheduleItems) =>
      acc +
      dayScheduleItems
        .filter((item): item is RequiredScheduleItemProps => item.isRequired)
        .filter(({ assignedMember }) => assignedMember !== null).length,
    0
  );

  const progress = Math.round(
    (filledRequiredItemsCount / totalRequiredItemsCount) * 100
  );

  return (
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      alignItems="center"
      gap={8}
    >
      <Box position="absolute" right={0} display="flex" gap={1}>
        <Button variant="outlined">Edit dates</Button>
        <Button variant="contained" onClick={onSaveClick}>
          Save
        </Button>
        <Button
          variant="contained"
          disabled={filledRequiredItemsCount < totalRequiredItemsCount}
          onClick={onPublishClick}
        >
          Publish
        </Button>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ScheduleHeader
          startDate={startDate}
          endDate={endDate}
          progress={progress}
        />
      </Box>
      <Box width="100vw" position="relative" overflow="auto">
        <Box display="flex" marginX={4}>
          <ScheduleTable
            startDate={startDate}
            endDate={endDate}
            roles={roles}
            scheduleItemsByDay={scheduleItemsByDay}
            onMemberSelected={onMemberSelected}
            stickyHeader={true}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PlannerDraftEditorPageWithAPI;
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
