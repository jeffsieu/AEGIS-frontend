import PrioritizedListItem from '../PrioritizedListItem/PrioritizedListItem';
import { Paper, MenuList, Popover } from '@mui/material';

function PrioritizedList(props) {
	const {
		isOpen, onResolve, onReject, anchorEl,
		qualifiedMembers, //array of members {available, callsign, dutyCount}
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
						onResolve(qualifiedMember);
					}}
					key={i}></PrioritizedListItem>
			);
		});
	}

	return (
		<Popover
		open={isOpen}
		anchorEl={anchorEl}
		onClose={onReject}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'left',
		}}
		>
			<MenuList>{renderListItems()}</MenuList>
		</Popover>
	);
}

export default PrioritizedList;
