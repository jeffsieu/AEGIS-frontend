import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material';
import {
  COLOR_SCHEDULE_ITEM_FILLED,
  COLOR_SCHEDULE_ITEM_PENDING,
} from '../../../utils/constants/schedule';
import { AvailableQualifiedMember, QualifiedMember } from '@typing';
import PrioritizedListPopover from '@components/prioritizedDropdown/PrioritizedList/PrioritizedListPopover';

export type ReadonlyScheduleItemProps = Pick<ScheduleItemProps, 'isRequired' | 'assignedMember'>;

export type RequiredScheduleItemProps = {
  isRequired: true;
  qualifiedMembers: QualifiedMember[];
  assignedMember: AvailableQualifiedMember | null;
  onMemberSelected: (member: AvailableQualifiedMember) => void;
};

export type NotRequiredScheduleItemProps = {
  isRequired: false;
  assignedMember: null;
};

export type ScheduleItemProps =
  | RequiredScheduleItemProps
  | NotRequiredScheduleItemProps;

export type ScheduleItemPropsWithoutCallback =
  | Omit<RequiredScheduleItemProps, 'onMemberSelected'>
  | NotRequiredScheduleItemProps;

function ScheduleItem(props: ScheduleItemProps) {
  const { isRequired } = props;

  const theme = useTheme();
  const customButtonTheme = createTheme({
    palette: {
      success: {
        main: COLOR_SCHEDULE_ITEM_FILLED,
      },
      warning: {
        main: COLOR_SCHEDULE_ITEM_PENDING,
      },
      action: {
        disabled: 'transparent',
        disabledBackground: theme.palette.action.disabledBackground,
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  if (isRequired) {
    const { qualifiedMembers, assignedMember, onMemberSelected } = props;

    return (
      <PrioritizedListPopover
        onMemberSelected={onMemberSelected}
        qualifiedMembers={qualifiedMembers}
        selectedMember={assignedMember}
      >
        {(openPopover) => (
          <ThemeProvider theme={customButtonTheme}>
            {assignedMember !== null ? (
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={openPopover}
              >
                {assignedMember.callSign}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="warning"
                disableElevation
                onClick={openPopover}
              >
                Pending
              </Button>
            )}
          </ThemeProvider>
        )}
      </PrioritizedListPopover>
    );
  } else {
    return (
      <ThemeProvider theme={customButtonTheme}>
        <Button aria-hidden variant="contained" disabled>
          Empty {/* Placeholder text to ensure button height is correct */}
        </Button>
      </ThemeProvider>
    );
  }
}

export default ScheduleItem;
