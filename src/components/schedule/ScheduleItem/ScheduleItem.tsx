import {
  Button,
  ButtonProps,
  SxProps,
  Theme,
  ThemeProvider,
} from '@mui/material';
import { QualifiedMember } from '@typing';
import PrioritizedListPopover from '@components/prioritizedDropdown/PrioritizedList/PrioritizedListPopover';
import { useCustomButtonTheme } from '@utils/theme';

export type ReadonlyScheduleItemProps = Pick<
  ScheduleItemProps,
  'isRequired' | 'assignedMember'
>;

export type RequiredScheduleItemProps = {
  isRequired: true;
  qualifiedMembers: QualifiedMember[];
  assignedMember: QualifiedMember | null;
  onMemberSelected?: (member: QualifiedMember | null) => void;
  isMemberSelected: boolean;
};

export type NotRequiredScheduleItemProps = {
  isRequired: false;
  assignedMember: null;
};

export type ScheduleItemProps =
  | RequiredScheduleItemProps
  | NotRequiredScheduleItemProps;

export type ScheduleItemPropsWithoutCallback =
  | Omit<RequiredScheduleItemProps, 'onMemberSelected' | 'isMemberSelected'>
  | NotRequiredScheduleItemProps;

function ScheduleItem(props: ScheduleItemProps) {
  const { isRequired } = props;

  const customButtonTheme = useCustomButtonTheme();

  if (isRequired) {
    const {
      qualifiedMembers,
      assignedMember,
      onMemberSelected,
      isMemberSelected,
    } = props;

    const disabledButtonStyles: SxProps<Theme> = {
      pointerEvents: 'none',
    };

    const unselectedMemberStyles: SxProps<Theme> = {
      opacity: 0.5,
    };

    const buttonProps: ButtonProps =
      onMemberSelected === undefined
        ? {
            sx: Object.assign(
              {},
              disabledButtonStyles,
              isMemberSelected ? {} : unselectedMemberStyles
            ),
            'aria-disabled': true,
            tabIndex: -1, // To make the non-interactable button unfocusable through tabbing, without using disabled
          }
        : {};

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
                {...buttonProps}
              >
                Pending
              </Button>
            ) : assignedMember.isAvailable ? (
              <Button
                variant="contained"
                color="success"
                disableElevation
                onClick={onMemberSelected && openPopover}
                {...buttonProps}
              >
                {assignedMember.callsign}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                disableElevation
                onClick={onMemberSelected && openPopover}
                {...buttonProps}
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
