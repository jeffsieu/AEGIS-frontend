import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import { Role } from '@typing';

export type MemberEntry = {
  callsign: string;
  roles: {
    [key: string]: boolean;
  };
};

export type MemberTableProps = {
  members: MemberEntry[];
  onMemberRolesChange: (callsign: string, roles: Role[]) => void;
};

function MemberTable(props: MemberTableProps) {
  const { members, onMemberRolesChange } = props;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {members.map((member, index) => (
        <div key={index}>
          <Typography variant="h6" gutterBottom>
            {member.callsign}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            onChange={(event, roles: Role[]) =>
              onMemberRolesChange(member.callsign, roles)
            }
            value={Object.keys(member.roles).filter(
              (role) => member.roles[role]
            )}
          >
            {[...Object.entries(member.roles)].map(([role, isSelected]) => (
              <ToggleButton key={role} value={role}>
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
