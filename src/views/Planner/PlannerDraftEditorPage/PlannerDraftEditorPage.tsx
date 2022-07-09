import ScheduleTable from '@components/schedule/ScheduleTable/ScheduleTable';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  ThemeProvider,
} from '@mui/material';
import {
  RequiredScheduleItemProps,
  ScheduleItemPropsWithoutCallback,
} from '@components/schedule/ScheduleItem/ScheduleItem';
import { QualifiedMember, UnavailableQualifiedMember } from '@typing';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteScheduleMutation,
  useGetMemberAvailabilitiesForMonthQuery,
  useGetRoleInstancesQuery,
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
import {
  ExpandLess,
  ExpandMore,
  Info,
  Publish,
  Warning,
} from '@mui/icons-material';
import { useCustomButtonTheme } from '@utils/theme';

function PlannerDraftEditorPageWithAPI() {
  const { month } = useParams();
  const navigate = useNavigate();
  const [publishDraft] = useUpdateScheduleMutation();
  const [deleteDraft] = useDeleteScheduleMutation();

  return useBuildWithApiQueries({
    queries: {
      draft: useGetScheduleForMonthQuery({
        month: month!,
      }),
      roleInstances: useGetRoleInstancesQuery(),
      memberAvailabilities: useGetMemberAvailabilitiesForMonthQuery(
        dayjs(`${month}-01`).toDate()
      ),
    },
    onLoad: ({ draft }) => {
      if (draft?.isPublished) {
        navigate(`/planner/schedules/${month}/view`);
      }
    },
    onSuccess: ({ roleInstances, memberAvailabilities, draft }) => {
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
        roleInstances,
        memberAvailabilities,
        onPublished: updateDraft(true),
        onSaved: updateDraft(false),
        onDeleted: async () => {
          deleteDraft(draft);
        },
      };

      return <PlannerDraftEditorPageWithState {...props} />;
    },
    onError: () => <EmptyHint>{ERROR_NO_SCHEDULE_FOUND}</EmptyHint>,
  });
}

export type PlannerDraftEditorPageWithStateProps = {
  roleInstances: Backend.Entry<Backend.RoleInstance>[];
  draft: Backend.Entry<Backend.Schedule>;
  memberAvailabilities: Backend.Entry<Backend.MemberWithAvailability>[];
  onPublished: (draft: Backend.Schedule) => Promise<void>;
  onSaved: (draft: Backend.Schedule) => Promise<void>;
  onDeleted: () => Promise<void>;
};

function PlannerDraftEditorPageWithState(
  props: PlannerDraftEditorPageWithStateProps
) {
  const navigate = useNavigate();
  const {
    roleInstances,
    memberAvailabilities,
    onSaved,
    onPublished,
    onDeleted,
  } = props;
  const [draft, setDraft] = useState(props.draft);
  const [isPublishing, setPublishing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    setDraft(props.draft);
  }, [props.draft]);

  const scheduleTableProps = useMemo(
    () =>
      scheduleToScheduleTableProps(
        draft,
        roleInstances,
        memberAvailabilities,
        memberAvailabilities
      ),
    [draft, roleInstances, memberAvailabilities]
  );

  const onMemberSelected = (
    date: Date,
    roleInstance: Backend.RoleInstance,
    member: QualifiedMember | null
  ) => {
    const backendRoleInstance = roleInstances.find(
      (r) =>
        r.description === roleInstance.description &&
        r.name === roleInstance.name
    )!;
    const duty = draft.duties.find(
      (duty) =>
        dayjs(date).isSame(duty.date, 'day') &&
        duty.roleInstanceId === backendRoleInstance.id
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

  const onDeleteClick = async () => {
    setDeleting(true);
    await onDeleted();
    setDeleting(false);
    navigate(`/planner/drafts`);
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
      onDraftDelete={onDeleteClick}
      isSaving={isSaving}
      isPublishing={isPublishing}
      isDeleting={isDeleting}
      canSave={canSave}
    />
  );
}

export type PlannerDraftEditorPageProps = {
  startDate: Date;
  endDate: Date;
  roleInstances: Backend.RoleInstance[];
  scheduleItemsByDay: ScheduleItemPropsWithoutCallback[][];
  onMemberSelected: (
    date: Date,
    roleInstance: Backend.RoleInstance,
    member: QualifiedMember | null
  ) => void;
  onPublishClick: () => Promise<void>;
  onSaveClick: () => Promise<void>;
  onDraftDelete: () => Promise<void>;
  isSaving: boolean;
  isPublishing: boolean;
  isDeleting: boolean;
  canSave: boolean;
};

function PlannerDraftEditorPage(props: PlannerDraftEditorPageProps) {
  const {
    startDate,
    endDate,
    roleInstances,
    scheduleItemsByDay,
    onMemberSelected,
    onPublishClick,
    onSaveClick,
    onDraftDelete,
    isSaving,
    isPublishing,
    isDeleting,
    canSave,
  } = props;

  const customButtonTheme = useCustomButtonTheme();

  const [showClashes, setShowClashes] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const progress = (filledRequiredItemsCount / totalRequiredItemsCount) * 100;

  const clashes = useMemo(() => {
    // Get all unavailable members that are still assigned
    return scheduleItemsByDay.map((scheduleItemsForDay, dayIndex) => {
      return scheduleItemsForDay
        .filter(
          (scheduleItem) =>
            scheduleItem.assignedMember !== null &&
            !scheduleItem.assignedMember.isAvailable
        )
        .map((scheduleItem, roleIndex) => ({
          ...scheduleItem,
          date: dayjs(startDate).add(dayIndex, 'day'),
          roleInstance: roleInstances[roleIndex],
        }));
    });
  }, [scheduleItemsByDay, startDate, roleInstances]);

  const clashCount = useMemo(
    () => clashes.reduce((acc, clash) => acc + clash.length, 0),
    [clashes]
  );

  const onDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

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
          <Button variant="outlined" color="error" onClick={onDeleteClick}>
            Delete
          </Button>
          <Dialog
            open={showDeleteConfirmation}
            onClose={() => setShowDeleteConfirmation(false)}
          >
            <DialogTitle>Delete draft</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this draft?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowDeleteConfirmation(false)}>
                Cancel
              </Button>
              <AsyncButton
                asyncRequest={async () => {
                  setShowDeleteConfirmation(false);
                  await onDraftDelete();
                }}
                loading={isDeleting}
                color="error"
              >
                Delete
              </AsyncButton>
            </DialogActions>
          </Dialog>
          <Divider orientation="vertical" flexItem />
          <AsyncButton
            loading={isSaving}
            variant="contained"
            disabled={!canSave}
            asyncRequest={onSaveClick}
          >
            Save
          </AsyncButton>
          <AsyncButton
            startIcon={<Publish />}
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
      {/* The div below is a hack to prevent too much bottom padding */}
      <div>
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
              roleInstances={roleInstances}
              scheduleItemsByDay={scheduleItemsByDay}
              onMemberSelected={onMemberSelected}
              stickyHeader={true}
              canFilter={true}
            />
          </FullWidthScheduleContainer>
        </Box>
        <Divider />
      </div>
      <Card variant="outlined">
        <ListItemButton
          onClick={() => {
            setShowLegend(!showLegend);
          }}
        >
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="Legend" />
          {showLegend ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showLegend}>
          <CardContent>
            <ThemeProvider theme={customButtonTheme}>
              <Box display="flex" gap={1}>
                <Chip color="success" label="No clashes" />
                <Chip color="warning" label="Unassigned" />
                <Chip color="error" label="Clashes present" />
              </Box>
            </ThemeProvider>
          </CardContent>
        </Collapse>
        <Divider />
        <ListItemButton
          onClick={() => {
            setShowClashes(!showClashes);
          }}
        >
          <ListItemIcon>
            <Badge badgeContent={clashCount} color="error">
              <Warning />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Clashes" />
          {showClashes ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showClashes}>
          <List dense>
            {clashes
              .filter((dayClashes) => dayClashes.length > 0)
              .map((dayClashes, index) => (
                <div key={index}>
                  {index > 0 && <Divider />}
                  <ListSubheader>
                    {dayClashes[0].date.format('DD/MM/YYYY')}
                  </ListSubheader>
                  {dayClashes.map((clash, clashIndex) => (
                    <div key={clashIndex}>
                      {(
                        clash.assignedMember as UnavailableQualifiedMember
                      ).unavailableReasons.map((reason, reasonIndex) => (
                        <ListItem key={reasonIndex}>
                          <ListItemText
                            primary={`[${clash.roleInstance.name} | ${
                              clash.assignedMember!.callsign
                            }]`}
                            secondary={reason.text}
                          />
                        </ListItem>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
          </List>
        </Collapse>
      </Card>
    </Stack>
  );
}

export default PlannerDraftEditorPageWithAPI;
export { PlannerDraftEditorPage as PlannerDraftEditorPageWithProps };
