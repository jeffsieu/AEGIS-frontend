import { useState } from 'react';
import PrioritizedList from './PrioritizedList';
import { AvailableQualifiedMember, QualifiedMember } from '@typing';
import { Popover } from '@mui/material';

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
  ...listProps
}: PrioritizedListPopoverProps) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const onClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <PrioritizedList
          {...listProps}
          onMemberSelected={(member) => {
            onMemberSelected(member);
            onClose();
          }}
        />
      </Popover>
      {children(openPopover)}
    </>
  );
}

export default PrioritizedListPopover;
