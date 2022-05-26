import { useCallback } from 'react';
import PrioritizedList from './PrioritizedList';
import ModalContainer, { create } from 'react-modal-promise';
import { AvailableQualifiedMember, QualifiedMember } from '@types';

export type PrioritizedListPopoverProps = {
  children: (
    openPopover: (event: React.MouseEvent<HTMLElement>) => void
  ) => React.ReactNode;
  qualifiedMembers: QualifiedMember[];
  selectedMember: AvailableQualifiedMember | null;
  onMemberSelected: (member: AvailableQualifiedMember) => void;
};

function PrioritizedListPopover({
  children,
  onMemberSelected,
  ...restProps
}: PrioritizedListPopoverProps) {
  const popover = create(PrioritizedList);
  const openPopover = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        const selectedMember: AvailableQualifiedMember = await popover({
          ...restProps,
          anchorEl: event.currentTarget,
        });
        onMemberSelected(selectedMember);
        return console.debug(selectedMember);
      } catch (rej) {
        return console.debug(rej);
      }
    },
    [popover, restProps, onMemberSelected]
  );

  return (
    <>
      <ModalContainer />
      {children(openPopover)}
    </>
  );
}

export default PrioritizedListPopover;
