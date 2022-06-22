import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import { Box, Button, Divider, Stack } from '@mui/material';
import {
  RequiredScheduleItemProps,
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
import { useEffect, useMemo, useState } from 'react';
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
        (isPublished: boolean) => async (schedule: Backend.Schedule) => {
          await publishDraft({
            ...schedule,
            isPublished,
          });
        };

      const props = {
        draft,
        roles,
        memberAvailabilities,
        onPublished: updateDraft(true),
        onSaved: updateDraft(false),
      };

      return <PlannerDraftEditorPageWithState {...props} />;
    },
    onError: () => <EmptyHint>{ERROR_NO_SCHEDULE_FOUND}</EmptyHint>,
  });
}

export type PlannerDraftEditorPageWithStateProps = {
  roles: Backend.Entry<Backend.Role>[];
  draft: Backend.Entry<Backend.Schedule>;
  memberAvailabilities: Backend.Entry<Backend.MemberWithAvailability>[];
  onPublished: (draft: Backend.Schedule) => Promise<void>;
  onSaved: (draft: Backend.Schedule) => Promise<void>;
};

function PlannerDraftEditorPageWithState(
  props: PlannerDraftEditorPageWithStateProps
) {
  const { roles, memberAvailabilities, onSaved, onPublished } = props;
  const [draft, setDraft] = useState(props.draft);
  const [isPublishing, setPublishing] = useState(false);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(props.draft);
  }, [props.draft]);

  const scheduleTableProps = useMemo(
    () =>
      scheduleToScheduleTableProps(
        draft,
        roles,
        memberAvailabilities,
        memberAvailabilities
      ),
    [draft, roles, memberAvailabilities]
  );

  const onMemberSelected = (
    date: Date,
    role: Role,
    member: AvailableQualifiedMember | null
  ) => {
    const backendRole = roles.find((r) => r.name === role.name)!;
    const duty = draft.duties.find(
      (duty) =>
        dayjs(date).isSame(duty.date, 'day') && duty.roleId === backendRole.id
    )!;
    const backendMember =
      memberAvailabilities.find((m) => m.callsign === member?.callsign) ?? null;
    const newDuty = {
      ...duty,
      memberId: backendMember?.id ?? undefined,
    };

    setDraft({
      ...draft,
      duties: draft.duties.map((d) => (d.id === duty.id ? newDuty : d)),
    });
  };

  const onPublishClick = async () => {
    setPublishing(true);
    await onPublished(draft);
    setPublishing(false);
  };

  const onSaveClick = async () => {
    setSaving(true);
    await onSaved(draft);
    setSaving(false);
  };

  const canSave = useMemo(() => {
    // Check for object equality, not deep equality
    // This means that if a change is made then reverted by the user, the Save button will still be enabled
    // Deep equality solves this issue, but it is not worth the performance cost
    return draft !== props.draft;
  }, [draft, props.draft]);

  return (
    <PlannerDraftEditorPage
      {...scheduleTableProps}
      onMemberSelected={onMemberSelected}
      onPublishClick={onPublishClick}
      onSaveClick={onSaveClick}
      isSaving={isSaving}
      isPublishing={isPublishing}
      canSave={canSave}
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
  onPublishClick: () => Promise<void>;
  onSaveClick: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
  canSave: boolean;
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
    canSave,
  } = props;

  const totalRequiredItemsCount = useMemo(
    () =>
      scheduleItemsByDay.reduce(
        (acc, dayScheduleItems) =>
          acc + dayScheduleItems.filter(({ isRequired }) => isRequired).length,
        0
      ),
    [scheduleItemsByDay]
  );

  const filledRequiredItemsCount = useMemo(
    () =>
      scheduleItemsByDay.reduce(
        (acc, dayScheduleItems) =>
          acc +
          dayScheduleItems
            .filter(
              (item): item is RequiredScheduleItemProps => item.isRequired
            )
            .filter(({ assignedMember }) => assignedMember !== null).length,
        0
      ),
    [scheduleItemsByDay]
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
          isPublished={false}
        />
        <Box position="absolute" top={0} right={0} display="flex" gap={1}>
          <Button variant="outlined">Edit dates</Button>
          <AsyncButton
            loading={isSaving}
            variant="contained"
            disabled={!canSave}
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
            canFilter={true}
          />
        </FullWidthScheduleContainer>
      </Box>
    </Stack>
  );
}

export default PlannerDraftEditorPageWithAPI;
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
