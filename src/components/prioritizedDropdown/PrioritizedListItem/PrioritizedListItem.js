import { MenuItem, ListItemText, Typography } from '@mui/material';
import { primary, neutrals } from 'hummingbird-ui';

function PrioritizedListItem(props) {
	const { available, callsign, dutyCount, onClick } = props;

	if (available) {
		return (
			<MenuItem sx={{ color: primary[400] }} onClick={onClick}>
				<ListItemText>{callsign} </ListItemText>
				<Typography sx={{ ml: 5 }}>{dutyCount} </Typography>
			</MenuItem>
		);
	} else {
		return (
			<MenuItem sx={{ color: neutrals[100] }} onClick={onClick}>
				<ListItemText>{callsign} </ListItemText>
				<Typography sx={{ ml: 5 }}>{dutyCount} </Typography>
			</MenuItem>
		);
	}
}

export default PrioritizedListItem;
