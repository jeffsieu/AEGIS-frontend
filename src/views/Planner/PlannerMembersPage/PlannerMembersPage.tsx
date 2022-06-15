import MemberTable, {
  MemberEntry,
  MemberTableProps,
} from '@components/members/MemberTable/MemberTable';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { Role } from '@typing';
import {
  useAddMemberMutation,
  useGetMembersQuery,
  useGetRolesQuery,
  useUpdateMemberRolesMutation,
} from '@services/backend';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import { useState } from 'react';
import { Backend } from '@typing/backend';

export type PlannerMembersPageProps = MemberTableProps & {
  isEditing: boolean;
  onSaveClick: () => void;
  onEditClick: () => void;
  onCancelClick: () => void;
  onAddMemberClick: (callsign: string) => void;
  callsignFieldText: string;
  onCallsignChange(callsign: string): void;
};

function PlannerMembersPageWithAPI() {
  const [updateMemberRoles] = useUpdateMemberRolesMutation();
  const [addMember] = useAddMemberMutation();

  return buildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roles: useGetRolesQuery(),
    },
    onSuccess: ({ members, roles }) => {
      const mappedMembers = members.map((member) => {
        const memberRoles = member.roles;
        const rolesMap: MemberEntry['roles'] = {};
        for (const role of roles) {
          rolesMap[role.name] = memberRoles.some(
            (memberRole) => memberRole.name === role.name
          );
        }
        return {
          ...member,
          roles: rolesMap,
        };
      });

      const props: PlannerMembersPageWithStateProps = {
        members: mappedMembers,
        roles: roles,
        updateMemberEntries: async (members: MemberEntry[]) => {
          for (const member of members) {
            const roleNames = Object.keys(member.roles).filter(
              (role) => member.roles[role]
            );

            if (!props.members.find((m) => m.callsign === member.callsign)) {
              // Add member
              const memberId = await addMember({
                callsign: member.callsign,
                squadron: 'placeholder',
                type: 'MEMBER',
              }).unwrap();

              await updateMemberRoles({
                memberId: memberId,
                roleNames: roleNames,
              });
            } else {
              // Member already exists
              await updateMemberRoles({
                memberId: mappedMembers.find(
                  (m) => m.callsign === member.callsign
                )!.id,
                roleNames: roleNames,
              });
            }
          }
        },
      };

      return (
        <PlannerMembersPageWithState {...props}></PlannerMembersPageWithState>
      );
    },
  });
}

export type PlannerMembersPageWithStateProps = {
  members: MemberEntry[];
  roles: Backend.Role[];
  updateMemberEntries: (members: MemberEntry[]) => void;
};

function PlannerMembersPageWithState(props: PlannerMembersPageWithStateProps) {
  const { updateMemberEntries, roles } = props;
  const [members, setMembers] = useState<MemberEntry[]>(props.members);
  const [isEditing, setEditing] = useState(false);
  const [callsignFieldText, setCallsignFieldText] = useState('');

  const onMemberRolesChange = (callsign: string, roles: Role[]) => {
    const member = members.find((member) => member.callsign === callsign)!;

    const newMember = {
      ...member,
    };
    Object.entries(newMember.roles).forEach(([role, isSelected]) => {
      newMember.roles = {
        ...newMember.roles,
      };
      newMember.roles[role] = roles.some((r) => r.name === role);
    });

    const newMembers = members.map((member) => {
      if (member.callsign === callsign) {
        return newMember;
      } else {
        return member;
      }
    });
    setMembers(newMembers);
  };

  return (
    <PlannerMembersPage
      members={members}
      isEditing={isEditing}
      onMemberRolesChange={onMemberRolesChange}
      onSaveClick={async () => {
        setEditing(false);
        updateMemberEntries(members);
      }}
      onEditClick={() => setEditing(true)}
      onCancelClick={() => {
        setEditing(false);
        setMembers(props.members);
      }}
      onAddMemberClick={(name) => {
        const newMemberRoles: MemberEntry['roles'] = {};
        for (const role of roles) {
          newMemberRoles[role.name] = false;
        }
        setMembers([
          ...members,
          {
            callsign: name,
            roles: newMemberRoles,
          },
        ]);
        setCallsignFieldText('');
      }}
      callsignFieldText={callsignFieldText}
      onCallsignChange={(callsign) => setCallsignFieldText(callsign)}
    />
  );
}

function PlannerMembersPage(props: PlannerMembersPageProps) {
  const {
    onMemberRolesChange,
    members,
    isEditing,
    onSaveClick,
    onEditClick,
    onCancelClick,
    onAddMemberClick,
    callsignFieldText,
    onCallsignChange,
  } = props;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Members
        </Typography>
        {!isEditing && (
          <Button variant="outlined" onClick={onEditClick}>
            Edit
          </Button>
        )}
      </Box>
      <MemberTable
        members={members}
        onMemberRolesChange={onMemberRolesChange}
        disabled={!isEditing}
      />
      {isEditing && (
        <>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                autoComplete="off"
                label="Callsign"
                variant="filled"
                value={callsignFieldText}
                onChange={(event) => {
                  onCallsignChange(event.target.value);
                }}
              />
              <Button
                type="submit"
                variant="contained"
                onClick={() => onAddMemberClick(callsignFieldText)}
              >
                Add member
              </Button>
            </Box>
          </form>
          <div>
            <Button onClick={onCancelClick}>Cancel</Button>
            <Button variant="contained" onClick={onSaveClick}>
              Save
            </Button>
          </div>
        </>
      )}
    </Box>
  );
}

export default PlannerMembersPageWithAPI;
export { PlannerMembersPage as PlannerMembersPageWithProps };
