import { useMemo } from 'react';
import PrioritizedListItem from '../PrioritizedListItem/PrioritizedListItem';
import { MenuList, Popover } from '@mui/material';

function PrioritizedList(props) {
  const {
    isOpen,
    onResolve,
    onReject,
    anchorEl,
    qualifiedMembers, //array of members {available, callsign, dutyCount}
  } = props;

  const sortedMembers = useMemo(() => {
    function sortByDutyCount(members) {
      return [...members].sort((a, b) => a.dutyCount - b.dutyCount);
    }

    function sortByAvailability(members) {
      return [...members].sort((a, b) => b.available - a.available);
    }

    function sortMembers(members) {
      return sortByAvailability(sortByDutyCount(members));
    }

    return sortMembers(qualifiedMembers);
  }, [qualifiedMembers]);

  function renderListItems() {
    return sortedMembers.map((qualifiedMember, i) => {
      return (
        <PrioritizedListItem
          {...qualifiedMember}
          key={i}
          onClick={() => {
            onResolve(qualifiedMember);
          }}
        ></PrioritizedListItem>
      );
    });
  }

  return (
    <Popover
      open={isOpen}
      onClose={onReject}
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
    >
      <MenuList>{renderListItems()}</MenuList>
    </Popover>
  );
}

export default PrioritizedList;
