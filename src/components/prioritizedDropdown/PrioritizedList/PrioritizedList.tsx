import { useMemo } from 'react';
import PrioritizedListItem from '@components/prioritizedDropdown/PrioritizedListItem/PrioritizedListItem';
import { MenuList } from '@mui/material';

import { AvailableQualifiedMember, QualifiedMember } from '@typing';

export type PrioritizedListProps = {
  qualifiedMembers: QualifiedMember[];
  selectedMember: QualifiedMember | null;
  onMemberSelected: (member: AvailableQualifiedMember) => void;
};

function PrioritizedList(props: PrioritizedListProps) {
  const { qualifiedMembers, onMemberSelected } = props;

  const sortedMembers = useMemo(() => {
    function sortByDutyCount(members: QualifiedMember[]) {
      return [...members].sort((a, b) => a.dutyCount - b.dutyCount);
    }

    function sortByAvailability(members: QualifiedMember[]) {
      return [...members].sort((a, b) => +b.isAvailable - +a.isAvailable);
    }

    function sortMembers(members: QualifiedMember[]) {
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
          selected={qualifiedMember === props.selectedMember}
          onClick={() => {
            if (qualifiedMember.isAvailable) {
              onMemberSelected(qualifiedMember);
            }
          }}
        ></PrioritizedListItem>
      );
    });
  }

  return <MenuList>{renderListItems()}</MenuList>;
}

export default PrioritizedList;
