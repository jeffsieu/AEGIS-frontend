import PrioritizedListItem from '../PrioritizedListItem/PrioritizedListItem';
import { Paper, MenuList } from '@mui/material';

function PrioritizedList(props) {
	const {
		qualifiedMembers, //array of members {available, callsign, dutyCount}
		onSelect, //callback returning selected member {available, callsign, dutyCount}
	} = props;

	function sortByDutyCount(members) {
		return members.sort((a, b) => a.dutyCount - b.dutyCount);
	}

	function sortByAvailability(members) {
		return members.sort((a, b) => (a.available && !b.available ? -1 : 0));
	}

	function sortMembers(members) {
		console.log(sortByDutyCount(members));
		return sortByAvailability(sortByDutyCount(members));
	}

	function renderListItems() {
		return sortMembers(qualifiedMembers).map((qualifiedMember, i) => {
			return (
				<PrioritizedListItem
					{...qualifiedMember}
					onClick={() => {
						onSelect(qualifiedMember);
					}}
					key={i}></PrioritizedListItem>
			);
		});
	}

	return (
		<Paper>
			<MenuList>{renderListItems()}</MenuList>
		</Paper>
	);
}

export default PrioritizedList;
