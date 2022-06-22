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
      <PaperTooltip
        title={
          <>
            <b>
              {member.dutyCount} dut{member.dutyCount === 1 ? 'y' : 'ies'}
            </b>{' '}
            so far
          </>
        }
        placement="right"
      >
        <MenuItem
          sx={{ color: theme.palette.primary.main }}
          onClick={onClick}
          selected={selected}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
          >
            {member.callsign}
          </ListItemText>
          <Typography sx={{ ml: 5 }}>{member.dutyCount} </Typography>
        </MenuItem>
      </PaperTooltip>
    );
  } else {
    return (
      <PaperTooltip
        title={
          <div>
            <Typography variant="overline">Reasons</Typography>
            <ul style={{ paddingInlineStart: '20px', marginBlockStart: '0' }}>
              {member.unavailableReasons.map((reason, index) => (
                <li key={index}>
                  <b>{reason}</b>
                </li>
              ))}
            </ul>
          </div>
        }
        placement="right"
      >
        <MenuItem
          onClick={onClick}
          selected={selected}
          sx={{ color: theme.palette.action.disabled }}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
          >
            {member.callsign}
          </ListItemText>
          <Typography sx={{ ml: 5 }}>{member.dutyCount} </Typography>
        </MenuItem>
      </PaperTooltip>
    );
  }
}

export default PrioritizedListItem;
