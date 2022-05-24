import { useCallback } from 'react';
import PrioritizedList from './PrioritizedList';
import ModalContainer, { create } from 'react-modal-promise';
import { QualifiedMember } from '@types';

export type PrioritizedListPopoverProps = {
  children: (
    openPopover: (event: React.MouseEvent<HTMLElement>) => void
  ) => React.ReactNode;
  qualifiedMembers: QualifiedMember[];
  selectedMember: QualifiedMember | null;
};

function PrioritizedListPopover({
  children,
  ...restProps
}: PrioritizedListPopoverProps) {
  const popover = create(PrioritizedList);

  const openPopover = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        const res = await popover({
          ...restProps,
          anchorEl: event.currentTarget,
        });
        return console.debug(res);
      } catch (rej) {
        return console.debug(rej);
      }
    },
    [popover, restProps]
  );

  return (
    <>
      <ModalContainer />
      {children(openPopover)}
    </>
  );
}

export default PrioritizedListPopover;
