import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { Role } from '@typing';
import EmptyHint from '@components/general/empty-hint';
import { ERROR_NO_MEMBERS } from '@utils/constants/string';

export type MemberEntry = {
  callsign: string;
  roles: {
    [key: string]: boolean;
  };
};

export type MemberTableProps = {
  members: MemberEntry[];
  onMemberRolesChange: (callsign: string, roles: Role[]) => void;
  disabled?: boolean;
};

function MemberTable(props: MemberTableProps) {
  const { members, onMemberRolesChange, disabled = false } = props;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {members.length === 0 && <EmptyHint>{ERROR_NO_MEMBERS}</EmptyHint>}
      {members.map((member, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            {member.callsign}
          </Typography>
          <ToggleButtonGroup
            disabled={disabled}
            color="primary"
            onChange={(event, roles: string[]) =>
              onMemberRolesChange(
                member.callsign,
                roles.map((role) => ({ name: role }))
              )
            }
            value={Object.keys(member.roles).filter(
              (role) => member.roles[role]
            )}
          >
            {[...Object.entries(member.roles)].map(([role, isSelected]) => (
              <ToggleButton key={role} value={role} disabled={disabled}>
                <Box display="flex" gap={1}>
                  {isSelected ? <Check /> : <Close />}
                  {role}
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      ))}
    </Box>
  );
}

export default MemberTable;
