import { MenuItem, ListItemText, Typography, useTheme } from '@mui/material';
import { QualifiedMember } from '@typing';
import PaperTooltip from '../../tooltips/PaperTooltip';

export type PrioritizedListItemProps = QualifiedMember & {
  onClick: () => void;
  selected: boolean;
};

function PrioritizedListItem(props: PrioritizedListItemProps) {
  const { onClick, selected } = props;
  const member: QualifiedMember = props;
  const theme = useTheme();

  if (member.isAvailable) {
    return (
      <MenuItem
        sx={{ color: theme.palette.primary.main }}
        onClick={onClick}
        selected={selected}
      >
        <ListItemText
          primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
        >
          {member.callSign}{' '}
        </ListItemText>
        <Typography sx={{ ml: 5 }}>{member.dutyCount} </Typography>
      </MenuItem>
    );
  } else {
    return (
      <PaperTooltip
        title={
          <>
            Unavailable due to <b>{member.unavailableReason}</b>{' '}
          </>
        }
        placement="right"
      >
        <MenuItem
          sx={{ color: theme.palette.action.disabled }}
          selected={selected}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
          >
            {member.callSign}{' '}
          </ListItemText>
          <Typography sx={{ ml: 5 }}>{member.dutyCount} </Typography>
        </MenuItem>
      </PaperTooltip>
    );
  }
}

export default PrioritizedListItem;
