import { useMemo } from 'react';
import PrioritizedListItem from '@components/prioritizedDropdown/PrioritizedListItem/PrioritizedListItem';
import { MenuList, Popover, PopoverProps } from '@mui/material';

import { InstanceProps } from 'react-modal-promise';
import { QualifiedMember } from '@types';

export type PrioritizedListProps = InstanceProps<QualifiedMember> &
  PopoverProps & {
    qualifiedMembers: QualifiedMember[];
    selectedMember: QualifiedMember | null;
  };

function PrioritizedList(props: PrioritizedListProps) {
  const { qualifiedMembers, isOpen, onResolve, onReject, ...popoverProps } =
    props;

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
            onResolve(qualifiedMember);
          }}
        ></PrioritizedListItem>
      );
    });
  }

  return (
    <Popover
      {...popoverProps}
      onClose={() => {
        onReject(undefined);
      }}
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
