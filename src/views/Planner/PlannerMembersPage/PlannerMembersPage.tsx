import MemberTable, {
  MemberEntry,
  MemberTableProps,
} from '@components/members/MemberTable/MemberTable';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Role } from '@typing';
import {
  useAddMemberMutation,
  useAddRoleMutation,
  useGetMembersQuery,
  useGetRolesQuery,
  useUpdateMemberRolesMutation,
} from '@services/backend';
import { buildWithApiQueries } from '@utils/helpers/api-builder';
import { useEffect, useState } from 'react';
import { Backend } from '@typing/backend';
import { AsyncButton } from '@components/general/async-button';
import { getCardColor } from '@utils/theme';
import { Add } from '@mui/icons-material';

export type PlannerMembersPageProps = MemberTableProps & {
  roles: Backend.Role[];
  isEditing: boolean;
  isSaving: boolean;
  onSaveClick: () => void;
  onEditClick: () => void;
  onCancelClick: () => void;

  //Members
  onAddMemberClick: (callsign: string) => void;
  callsignFieldText: string;
  onCallsignChange(callsign: string): void;

  // Roles
  onAddRoleClick: (role: string) => void;
  roleFieldText: string;
  onRoleFieldChange: (role: string) => void;
};

function PlannerMembersPageWithAPI() {
  const [updateMemberRoles] = useUpdateMemberRolesMutation();
  const [addMember] = useAddMemberMutation();
  const [addRole] = useAddRoleMutation();

  async function createRole(role: Backend.Role) {
    await addRole(role).unwrap();
  }

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
        createRole,
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
  updateMemberEntries: (members: MemberEntry[]) => Promise<void>;
  createRole: (role: Backend.Role) => Promise<void>;
};

function PlannerMembersPageWithState(props: PlannerMembersPageWithStateProps) {
  const { updateMemberEntries, createRole } = props;
  const [members, setMembers] = useState<MemberEntry[]>(props.members);
  const [roles, setRoles] = useState<Backend.Role[]>(props.roles);
  const [isEditing, setEditing] = useState(false);
  const [callsignFieldText, setCallsignFieldText] = useState('');
  const [isSaving, setSaving] = useState(false);
  const [roleFieldText, setRoleFieldText] = useState('');

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

  const createNewRoles = async (roles: Backend.Role[]) => {
    const newRoles = roles.filter((role) =>
      props.roles.every((r) => r.name !== role.name)
    );
    for (const role of newRoles) {
      await createRole(role);
    }
  };

  useEffect(() => {
    setMembers(props.members);
  }, [props.members]);
  useEffect(() => {
    setRoles(props.roles);
  }, [props.roles]);

  return (
    <PlannerMembersPage
      members={members}
      roles={roles}
      isEditing={isEditing}
      onMemberRolesChange={onMemberRolesChange}
      onSaveClick={async () => {
        try {
          setSaving(true);
          await createNewRoles(roles);
          await updateMemberEntries(members);
          setSaving(false);
          setEditing(false);
        } catch (err) {
          setSaving(false);
        }
      }}
      onEditClick={() => setEditing(true)}
      onCancelClick={() => {
        setEditing(false);
        setMembers(props.members);
        setRoles(props.roles);
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
      isSaving={isSaving}
      onAddRoleClick={(role: string) => {
        setRoles([...roles, { name: role }]);
        setRoleFieldText('');
        setMembers(
          members.map((member) => {
            const newMemberRoles = { ...member.roles };
            newMemberRoles[role] = false;
            return {
              ...member,
              roles: newMemberRoles,
            };
          })
        );
      }}
      roleFieldText={roleFieldText}
      onRoleFieldChange={(role) => setRoleFieldText(role)}
    />
  );
}

function PlannerMembersPage(props: PlannerMembersPageProps) {
  const {
    onMemberRolesChange,
    members,
    roles,
    isEditing,
    onSaveClick,
    onEditClick,
    onCancelClick,
    onAddMemberClick,
    callsignFieldText,
    onCallsignChange,
    isSaving,
    onAddRoleClick,
    roleFieldText,
    onRoleFieldChange,
  } = props;

  const theme = useTheme();

  const alphaRegex = /^[a-zA-Z_]*$/;
  const isCallsignNotAlphanumeric = !alphaRegex.test(callsignFieldText);
  const isCallsignTooShort = callsignFieldText.length < 3;
  const isCallsignTooLong = callsignFieldText.length > 8;
  const isCallsignEmpty = callsignFieldText.length === 0;
  const isInvalidCallsign =
    isCallsignNotAlphanumeric || isCallsignTooShort || isCallsignTooLong;
  const errorText = isCallsignEmpty
    ? ''
    : isCallsignNotAlphanumeric
    ? 'Callsign can only contain letters'
    : isCallsignTooShort
    ? 'Callsign must be at least 3 characters'
    : isCallsignTooLong
    ? 'Callsign cannot be longer than 8 characters'
    : '';

  const isInvalidRole = roleFieldText.length === 0;

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
        <Card variant="outlined" sx={{ background: getCardColor(theme) }}>
          <CardContent>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                gap={2}
                paddingY={1}
              >
                <Box display="flex" gap={1}>
                  <Add htmlColor={theme.palette.text.secondary} />
                  <Typography
                    variant="h6"
                    gutterBottom
                    color={theme.palette.text.secondary}
                  >
                    Create new member...
                  </Typography>
                </Box>
                <TextField
                  autoComplete="off"
                  label="Callsign"
                  variant="filled"
                  value={callsignFieldText}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onCallsignChange(event.target.value);
                  }}
                  error={isInvalidCallsign && !isCallsignEmpty}
                  helperText={errorText}
                />
                <Button
                  type="submit"
                  disabled={isInvalidCallsign}
                  variant="contained"
                  onClick={() => onAddMemberClick(callsignFieldText)}
                >
                  Add member
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
      <Divider />
      <Typography variant="h5">Roles</Typography>
      <List disablePadding>
        {roles.map((role, index) => (
          <ListItem disableGutters>
            <ListItemButton>
              <ListItemIcon>
                <Typography variant="h6">{index + 1}.</Typography>
              </ListItemIcon>
              <ListItemText>{role.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {isEditing && (
        <>
          <Card variant="outlined" sx={{ background: getCardColor(theme) }}>
            <CardContent>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="start"
                  gap={2}
                  paddingY={1}
                >
                  <Box display="flex" gap={1}>
                    <Add htmlColor={theme.palette.text.secondary} />
                    <Typography
                      variant="h6"
                      gutterBottom
                      color={theme.palette.text.secondary}
                    >
                      Create new role...
                    </Typography>
                  </Box>
                  <TextField
                    autoComplete="off"
                    label="Role name"
                    variant="filled"
                    value={roleFieldText}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onRoleFieldChange(event.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isInvalidRole}
                    onClick={() => onAddRoleClick(roleFieldText)}
                  >
                    Add role
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
          <Divider />
          <Box display="flex" gap={1}>
            <Button onClick={onCancelClick}>Cancel</Button>
            <AsyncButton
              loading={isSaving}
              variant="contained"
              asyncRequest={onSaveClick}
            >
              Save
            </AsyncButton>
          </Box>
        </>
      )}
    </Box>
  );
}

export default PlannerMembersPageWithAPI;
export { PlannerMembersPage as PlannerMembersPageWithProps };
