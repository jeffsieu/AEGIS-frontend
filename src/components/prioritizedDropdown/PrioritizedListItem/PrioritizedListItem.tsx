import { MenuItem, ListItemText, Typography, useTheme } from '@mui/material';
import { QualifiedMember } from '@typing';
import { requestTypeToEmoji } from '@utils/helpers/schedule';
import dayjs from 'dayjs';
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
		let isLate = false;
		let reasonsEmoji = "";
		member.unavailableReasons.forEach(reason => {
			if(reason.isLate) isLate = true;
			if(reason.type !== null) reasonsEmoji += requestTypeToEmoji(reason.type);
		})
    return (
      <PaperTooltip
        title={
          <div>
            <Typography variant="overline">Reasons</Typography>
            <ul style={{ paddingInlineStart: '20px', marginBlockStart: '0' }}>
              {member.unavailableReasons.map((reason, index) => (
                <li key={index}>
                  <b>{reason.text}</b>
									{(reason.isLate && reason.dateSubmitted !== null) ? ` (Late submission: ${dayjs(reason.dateSubmitted).toString()})` : null}
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
          sx={{ color: isLate ? theme.palette.error.light : theme.palette.action.disabled}}
        >
          <ListItemText
            primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
          >
            {member.callsign} {reasonsEmoji}
          </ListItemText>
          <Typography sx={{ ml: 5 }}>{member.dutyCount} </Typography>
        </MenuItem>
      </PaperTooltip>
    );
  }
}

export default PrioritizedListItem;
