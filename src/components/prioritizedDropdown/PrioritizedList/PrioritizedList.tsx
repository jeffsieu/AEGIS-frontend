import { useMemo } from 'react';
import PrioritizedListItem from '@components/prioritizedDropdown/PrioritizedListItem/PrioritizedListItem';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
} from '@mui/material';

import { AvailableQualifiedMember, QualifiedMember } from '@typing';
import { RemoveCircleOutline } from '@mui/icons-material';

export type PrioritizedListProps = {
  qualifiedMembers: QualifiedMember[];
  selectedMember: QualifiedMember | null;
  onMemberSelected: (member: AvailableQualifiedMember | null) => void;
};

function PrioritizedList(props: PrioritizedListProps) {
  const { qualifiedMembers, onMemberSelected, selectedMember } = props;

  const theme = useTheme();

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

  const sortedAvailableMembers = useMemo(() => {
    return sortedMembers.filter((member) => member.isAvailable);
  }, [sortedMembers]);

  const sortedUnavailableMembers = useMemo(() => {
    return sortedMembers.filter((member) => !member.isAvailable);
  }, [sortedMembers]);

  return (
    <MenuList>
      <MenuItem
        key={-1}
        disabled={selectedMember === null}
        onClick={() => {
          onMemberSelected(null);
        }}
      >
        <ListItemIcon>
          <RemoveCircleOutline />
        </ListItemIcon>
        <ListItemText color={theme.palette.text.secondary}>
          Unassign
        </ListItemText>
      </MenuItem>
      {sortedAvailableMembers.length > 0 && (
        <>
          <Divider />
          <li>
            <Typography
              sx={{ mt: 0.5, ml: 2 }}
              color="text.secondary"
              display="block"
              variant="caption"
            >
              Available
            </Typography>
          </li>
        </>
      )}
      {sortedAvailableMembers.map((qualifiedMember, i) => {
        return (
          <PrioritizedListItem
            {...qualifiedMember}
            key={i}
            selected={qualifiedMember === selectedMember}
            onClick={() => {
              onMemberSelected(qualifiedMember as AvailableQualifiedMember);
            }}
          ></PrioritizedListItem>
        );
      })}
      {sortedUnavailableMembers.length > 0 && (
        <>
          <Divider component="li" />
          <li>
            <Typography
              sx={{ mt: 0.5, ml: 2 }}
              color="text.secondary"
              display="block"
              variant="caption"
            >
              With requests
            </Typography>
          </li>
        </>
      )}
      {sortedUnavailableMembers.map((qualifiedMember, i) => {
        return (
          <PrioritizedListItem
            {...qualifiedMember}
            key={i}
            selected={qualifiedMember === selectedMember}
            onClick={() => {
              onMemberSelected(qualifiedMember as AvailableQualifiedMember);
            }}
          ></PrioritizedListItem>
        );
      })}
    </MenuList>
  );
}

export default PrioritizedList;
