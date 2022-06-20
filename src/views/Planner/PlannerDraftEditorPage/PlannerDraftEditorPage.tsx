import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button, Divider, Stack } from '@mui/material';
import {
  RequiredScheduleItemProps,
  ScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { AvailableQualifiedMember, Role } from '@typing';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetMemberAvailabilitiesForMonthQuery,
  useGetRolesQuery,
  useGetScheduleForMonthQuery,
  useUpdateScheduleMutation,
} from '@services/backend';
import { scheduleToScheduleTableProps } from '@utils/helpers/schedule';
import EmptyHint from '@components/general/empty-hint';
import { ERROR_NO_SCHEDULE_FOUND } from '@utils/constants/string';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useState } from 'react';
import dayjs from 'dayjs';
import { Backend } from '@typing/backend';
import { AsyncButton } from '@components/general/async-button';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';

function PlannerDraftEditorPageWithAPI() {
  const { month } = useParams();
  const navigate = useNavigate();
  const [publishDraft] = useUpdateScheduleMutation();

  return useBuildWithApiQueries({
    queries: {
      draft: useGetScheduleForMonthQuery({
        month: month!,
      }),
      roles: useGetRolesQuery(),
      memberAvailabilities: useGetMemberAvailabilitiesForMonthQuery(
        dayjs(`${month}-01`).toDate()
      ),
    },
    onLoad: ({ draft }) => {
      if (draft.isPublished) {
        navigate(`/planner/schedules/${month}/view`);
      }
    },
    onSuccess: ({ roles, memberAvailabilities, draft }) => {
      if (draft === null) return <>No records for {month} found</>;

      const updateDraft =
        (isPublished: boolean) =>
        async (scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][]) => {
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

          await publishDraft({
            month: dayjs(month).date(1).format('YYYY-MM-DD'),
            isPublished: isPublished,
            duties,
          });
        };

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
    ) => Promise<void>;
    onSaved: (
      scheduleItemsByDay: PlannerDraftEditorPageProps['scheduleItemsByDay']
    ) => Promise<void>;
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

  const [isPublishing, setPublishing] = useState(false);
  const [isSaving, setSaving] = useState(false);

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

  const onPublishClick = async () => {
    setPublishing(true);
    await onPublished(scheduleItemsByDay);
    setPublishing(false);
  };

  const onSaveClick = async () => {
    setSaving(true);
    await onSaved(scheduleItemsByDay);
    setSaving(false);
  };

  return (
    <PlannerDraftEditorPage
      {...props}
      scheduleItemsByDay={scheduleItemsByDay}
      onMemberSelected={onMemberSelected}
      onPublishClick={onPublishClick}
      onSaveClick={onSaveClick}
      isSaving={isSaving}
      isPublishing={isPublishing}
    />
  );
}

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
  isSaving: boolean;
  isPublishing: boolean;
};

function PlannerDraftEditorPage(props: PlannerDraftEditorPageProps) {
  const {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay,
    onMemberSelected,
    onPublishClick,
    onSaveClick,
    isSaving,
    isPublishing,
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
    <Stack spacing={4}>
      <Box position="relative">
        <ScheduleHeader
          startDate={startDate}
          endDate={endDate}
          progress={progress}
        />
        <Box position="absolute" top={0} right={0} display="flex" gap={1}>
          <Button variant="outlined">Edit dates</Button>
          <AsyncButton
            loading={isSaving}
            variant="contained"
            asyncRequest={onSaveClick}
          >
            Save
          </AsyncButton>
          <AsyncButton
            loading={isPublishing}
            variant="contained"
            disabled={filledRequiredItemsCount < totalRequiredItemsCount}
            asyncRequest={onPublishClick}
          >
            Publish
          </AsyncButton>
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        position="relative"
        flexDirection="column"
        alignItems="center"
      >
        <FullWidthScheduleContainer>
          <ScheduleTable
            startDate={startDate}
            endDate={endDate}
            roles={roles}
            scheduleItemsByDay={scheduleItemsByDay}
            onMemberSelected={onMemberSelected}
            stickyHeader={true}
          />
        </FullWidthScheduleContainer>
      </Box>
    </Stack>
  );
}

export default PlannerDraftEditorPageWithAPI;
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
