import { MenuItem, ListItemText, Typography } from '@mui/material';
import { primary, neutrals } from 'hummingbird-ui';
import LightTooltip from '../../tooltips/LightTooltip';

function PrioritizedListItem(props) {
  const { available, callsign, dutyCount, reason, onClick } = props;

  if (available) {
    return (
      <MenuItem sx={{ color: primary[400] }} onClick={onClick}>
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
        <MenuItem sx={{ color: neutrals[100] }} onClick={onClick}>
          <ListItemText>{callsign} </ListItemText>
          <Typography sx={{ ml: 5 }}>{dutyCount} </Typography>
        </MenuItem>
      </LightTooltip>
    );
  }
}

export default PrioritizedListItem;
