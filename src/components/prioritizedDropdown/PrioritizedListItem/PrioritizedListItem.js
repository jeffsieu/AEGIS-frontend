import { MenuItem, ListItemText, Typography, useTheme } from '@mui/material';
import LightTooltip from '../../tooltips/LightTooltip';

function PrioritizedListItem(props) {
  const { available, callsign, dutyCount, reason, onClick } = props;
  const theme = useTheme();

  if (available) {
    return (
      <MenuItem sx={{ color: theme.palette.primary.main }} onClick={onClick}>
        <ListItemText>{callsign} </ListItemText>
        <Typography sx={{ ml: 5 }}>{dutyCount} </Typography>
      </MenuItem>
    );
  } else {
    return (
      <LightTooltip
        title={
          <>
            Unavailable due to <b>{reason}</b>{' '}
          </>
        }
        placement="right"
      >
        <MenuItem
          sx={{ color: theme.palette.action.disabled }}
          onClick={onClick}
        >
          <ListItemText>{callsign} </ListItemText>
          <Typography sx={{ ml: 5 }}>{dutyCount} </Typography>
        </MenuItem>
      </LightTooltip>
    );
  }
}

export default PrioritizedListItem;
