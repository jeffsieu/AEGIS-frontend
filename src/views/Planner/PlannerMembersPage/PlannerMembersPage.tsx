import MemberTable, {
  MemberEntry,
  MemberTableProps,
} from '@components/members/MemberTable/MemberTable';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Role } from '@typing';
import {
  useAddMemberMutation,
  useGetMembersQuery,
  useGetRolesQuery,
  useUpdateMemberRolesMutation,
} from '@services/backend';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useEffect, useMemo, useState } from 'react';
import { Backend } from '@typing/backend';
import { AsyncButton } from '@components/general/async-button';
import { getCardColor } from '@utils/theme';
import { Clear, Search } from '@mui/icons-material';
import TitledContainer from '@components/general/titled-container';

export type PlannerMembersPageProps = MemberTableProps & {
  roles: Backend.Role[];
  isEditing: boolean;
  isSaving: boolean;
  onSaveClick: () => Promise<void>;
  onEditClick: () => void;
  onCancelClick: () => void;

  //Members
  onAddMemberClick: (callsign: string) => void;
  callsignFieldText: string;
  onCallsignChange(callsign: string): void;

  // Query-related
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

function PlannerMembersPageWithAPI() {
  const [updateMemberRoles] = useUpdateMemberRolesMutation();
  const [addMember] = useAddMemberMutation();

  return useBuildWithApiQueries({
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
                sqn: 'ADW',
                type: 'MEMBER',
              }).unwrap();

              await updateMemberRoles({
                memberId: memberId,
                roleNames: roleNames,
              });
            } else {
              // Member already exists
              const mappedMember = mappedMembers.find(
                (m) => m.callsign === member.callsign
              )!;

              // Check if member needs an update
              const needsUpdate = Object.keys(member.roles).some((role) => {
                return member.roles[role] !== mappedMember.roles[role];
              });

              if (!needsUpdate) {
                continue;
              }

              // Update member
              const memberId = mappedMember.id;
              await updateMemberRoles({
                memberId: memberId,
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
  updateMemberEntries: (members: MemberEntry[]) => Promise<void>;
};

function PlannerMembersPageWithState(props: PlannerMembersPageWithStateProps) {
  const { updateMemberEntries, roles } = props;
  const [members, setMembers] = useState<MemberEntry[]>(props.members);
  const [search, setSearch] = useState<string>('');
  const [isEditing, setEditing] = useState(false);
  const [callsignFieldText, setCallsignFieldText] = useState('');
  const [isSaving, setSaving] = useState(false);

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

  useEffect(() => {
    setMembers(props.members);
  }, [props.members]);

  return (
    <PlannerMembersPage
      members={members}
      roles={roles}
      isEditing={isEditing}
      onMemberRolesChange={onMemberRolesChange}
      onSaveClick={async () => {
        try {
          setSaving(true);
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
      }}
      onAddMemberClick={(name) => {
        const newMemberRoles: MemberEntry['roles'] = {};
        for (const role of roles) {
          newMemberRoles[role.name] = false;
        }
        setMembers([
          {
            callsign: name,
            roles: newMemberRoles,
          },
          ...members,
        ]);
        setCallsignFieldText('');
      }}
      callsignFieldText={callsignFieldText}
      onCallsignChange={(callsign) => setCallsignFieldText(callsign)}
      isSaving={isSaving}
      searchQuery={search}
      onSearchQueryChange={(query: string) => {
        setSearch(query.replace(/\W/g, ''));
      }}
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
    isSaving,
    searchQuery,
    onSearchQueryChange,
  } = props;

  const theme = useTheme();

  const alphaRegex = /^[a-zA-Z0-9_]*$/;
  const isCallsignNotAlphanumeric = !alphaRegex.test(callsignFieldText);
  const isCallsignEmpty = callsignFieldText.length === 0;
  const isInvalidCallsign =
    isCallsignNotAlphanumeric;
  const errorText = isCallsignEmpty
    ? ''
    : isCallsignNotAlphanumeric
    ? 'Callsign can only contain letters and numbers'
    : '';

  const filteredMembers = useMemo(() => {
    const regex = new RegExp(`^${searchQuery.toLowerCase()}`);
    return members.filter((member) =>
      regex.test(member.callsign.toLowerCase())
    );
  }, [members, searchQuery]);

  return (
    <TitledContainer
      title="Members"
      endComponent={
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            value={searchQuery}
            onChange={(event) => {
              onSearchQueryChange(event.target.value);
            }}
            placeholder="Search callsign"
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      visibility: searchQuery.length > 0 ? 'visible' : 'hidden',
                    }}
                    onClick={() => {
                      onSearchQueryChange('');
                    }}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <Divider orientation="vertical" flexItem />
          {!isEditing && (
            <Button variant="outlined" onClick={onEditClick}>
              Edit
            </Button>
          )}
          {isEditing && (
            <>
              <Button onClick={onCancelClick}>Cancel</Button>
              <AsyncButton
                loading={isSaving}
                variant="contained"
                asyncRequest={onSaveClick}
              >
                Save
              </AsyncButton>
            </>
          )}
        </Box>
      }
      bottomComponent={
        <div>
          {isEditing && (
            <Box marginBottom={1}>
              <Alert severity="info">
                Currently editing. Remember to save your changes.
              </Alert>
            </Box>
          )}
        </div>
      }
    >
      <Stack spacing={4}>
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
                  <Typography
                    variant="h5"
                    gutterBottom
                    color={theme.palette.text.secondary}
                  >
                    Add member
                  </Typography>
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
        <MemberTable
          members={filteredMembers}
          onMemberRolesChange={onMemberRolesChange}
          disabled={!isEditing}
        />
      </Stack>
    </TitledContainer>
  );
}

export default PlannerMembersPageWithAPI;
export { PlannerMembersPage as PlannerMembersPageWithProps };
