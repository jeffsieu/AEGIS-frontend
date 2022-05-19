import { MenuItem, ListItemText } from '@mui/material';
import { primary, neutrals } from 'hummingbird-ui';

function PrioritizedListItem(props) {
	const { available, callsign, dutyCount, onClick } = props;

	if (available) {
		return (
			<MenuItem sx={{ color: primary[400] }} onClick={onClick}>
				<ListItemText>{callsign} </ListItemText>
				<ListItemText>{dutyCount} </ListItemText>
			</MenuItem>
		);
	} else {
		return (
			<MenuItem sx={{ color: neutrals[100] }} onClick={onClick}>
				<ListItemText>{callsign} </ListItemText>
				<ListItemText>{dutyCount} </ListItemText>
			</MenuItem>
		);
	}
}

export default PrioritizedListItem;
