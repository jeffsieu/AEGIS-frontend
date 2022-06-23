import { alpha, Button, createTheme, ThemeProvider } from '@mui/material';
import { useTheme } from '@mui/material';
import { QualifiedMember } from '@typing';
import PrioritizedListPopover from '@components/prioritizedDropdown/PrioritizedList/PrioritizedListPopover';

export type ReadonlyScheduleItemProps = Pick<
  ScheduleItemProps,
  'isRequired' | 'assignedMember'
>;

export type RequiredScheduleItemProps = {
  isRequired: true;
  qualifiedMembers: QualifiedMember[];
  assignedMember: QualifiedMember | null;
  onMemberSelected?: (member: QualifiedMember | null) => void;
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
  const customButtonTheme = createTheme(theme, {
    palette: {
      success: {
        main: alpha(theme.palette.success.main, 0.5),
        light: alpha(theme.palette.success.light, 0.5),
        dark: alpha(theme.palette.success.dark, 0.5),
        contrastText: theme.palette.text.secondary,
      },
      warning: {
        main: alpha(theme.palette.warning.main, 0.5),
        light: alpha(theme.palette.warning.light, 0.5),
        dark: alpha(theme.palette.warning.dark, 0.5),
        contrastText: theme.palette.text.secondary,
      },
      error: {
        main: alpha(theme.palette.error.main, 0.5),
        light: alpha(theme.palette.error.light, 0.5),
        dark: alpha(theme.palette.error.dark, 0.5),
        contrastText: theme.palette.text.primary,
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
        onMemberSelected={onMemberSelected ?? (() => {})}
        qualifiedMembers={qualifiedMembers}
        selectedMember={assignedMember}
      >
        {(openPopover) => (
          <ThemeProvider theme={customButtonTheme}>
            {assignedMember === null ? (
              <Button
                variant="contained"
                color="warning"
                disableElevation
                onClick={onMemberSelected && openPopover}
              >
                Pending
              </Button>
            ) : assignedMember.isAvailable ? (
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={onMemberSelected && openPopover}
              >
                {assignedMember.callsign}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={onMemberSelected && openPopover}
              >
                {assignedMember.callsign}
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
