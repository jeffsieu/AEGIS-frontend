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
import { useAddRoleMutation, useGetRolesQuery } from '@services/backend';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useEffect, useState } from 'react';
import { Backend } from '@typing/backend';
import { AsyncButton } from '@components/general/async-button';
import { getCardColor } from '@utils/theme';
import { Add } from '@mui/icons-material';

export type PlannerRolesPageProps = {
  roles: Backend.Role[];
  isEditing: boolean;
  isSaving: boolean;
  onSaveClick: () => Promise<void>;
  onEditClick: () => void;
  onCancelClick: () => void;

  // Roles
  onAddRoleClick: (role: string) => void;
  roleFieldText: string;
  onRoleFieldChange: (role: string) => void;
};

function PlannerRolesPageWithAPI() {
  const [addRole] = useAddRoleMutation();

  async function createRole(role: Backend.Role) {
    await addRole({
      ...role,
      roleInstances: [],
    }).unwrap();
  }

  return useBuildWithApiQueries({
    queries: {
      roles: useGetRolesQuery(),
    },
    onSuccess: ({ roles }) => {
      const props: PlannerRolesPageWithStateProps = {
        roles: roles,
        createRole,
      };

      return <PlannerRolesPageWithState {...props}></PlannerRolesPageWithState>;
    },
  });
}

export type PlannerRolesPageWithStateProps = {
  roles: Backend.Role[];
  createRole: (role: Backend.Role) => Promise<void>;
};

function PlannerRolesPageWithState(props: PlannerRolesPageWithStateProps) {
  const { createRole } = props;
  const [roles, setRoles] = useState<Backend.Role[]>(props.roles);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [roleFieldText, setRoleFieldText] = useState('');

  const createNewRoles = async (roles: Backend.Role[]) => {
    const newRoles = roles.filter((role) =>
      props.roles.every((r) => r.name !== role.name)
    );
    for (const role of newRoles) {
      await createRole(role);
    }
  };

  useEffect(() => {
    setRoles(props.roles);
  }, [props.roles]);

  return (
    <PlannerRolesPage
      roles={roles}
      isEditing={isEditing}
      onSaveClick={async () => {
        try {
          setSaving(true);
          await createNewRoles(roles);
          setSaving(false);
          setEditing(false);
        } catch (err) {
          setSaving(false);
        }
      }}
      onEditClick={() => setEditing(true)}
      onCancelClick={() => {
        setEditing(false);
        setRoles(props.roles);
      }}
      isSaving={isSaving}
      onAddRoleClick={(role: string) => {
        setRoles([...roles, { name: role }]);
        setRoleFieldText('');
      }}
      roleFieldText={roleFieldText}
      onRoleFieldChange={(role) => setRoleFieldText(role)}
    />
  );
}

function PlannerRolesPage(props: PlannerRolesPageProps) {
  const {
    roles,
    isEditing,
    onSaveClick,
    onEditClick,
    onCancelClick,
    isSaving,
    onAddRoleClick,
    roleFieldText,
    onRoleFieldChange,
  } = props;

  const theme = useTheme();
  const isInvalidRole = roleFieldText.length === 0;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom>
          Roles
        </Typography>
        {!isEditing && (
          <Button variant="outlined" onClick={onEditClick}>
            Edit
          </Button>
        )}
      </Box>
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
                      New role
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

export default PlannerRolesPageWithAPI;
export { PlannerRolesPage as PlannerRolesPageWithProps };
