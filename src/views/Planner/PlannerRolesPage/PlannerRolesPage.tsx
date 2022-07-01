import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
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
import { Add, Clear, Person } from '@mui/icons-material';
import TitledContainer from '@components/general/titled-container';

type RoleWithInstances = Backend.Role & {
  roleInstances: Backend.RoleInstance[];
};

export type PlannerRolesPageProps = {
  roles: RoleWithInstances[];
  roleInstanceDescriptions: string[];
  isEditing: boolean;
  isSaving: boolean;
  onSaveClick: () => Promise<void>;
  onEditClick: () => void;
  onCancelClick: () => void;

  // Roles
  onAddRoleClick: (role: string) => void;
  roleFieldText: string;
  onRoleFieldChange: (role: string) => void;
  onRoleInstanceDescriptionsChange: (
    roleInstanceDescriptions: string[]
  ) => void;
  onAddInstanceClick: () => void;
  onDeleteInstanceClick: (index: number) => void;
};

function PlannerRolesPageWithAPI() {
  const [addRole] = useAddRoleMutation();

  async function createRole(role: RoleWithInstances) {
    await addRole(role).unwrap();
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
  roles: RoleWithInstances[];
  createRole: (role: RoleWithInstances) => Promise<void>;
};

const DEFAULT_ROLE_INSTANCES = ['', 'Stby'];

function PlannerRolesPageWithState(props: PlannerRolesPageWithStateProps) {
  const { createRole } = props;
  const [roles, setRoles] = useState<RoleWithInstances[]>(props.roles);
  const [isEditing, setEditing] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [roleFieldText, setRoleFieldText] = useState('');
  const [roleInstanceDescriptions, setRoleInstanceDescriptions] = useState(
    DEFAULT_ROLE_INSTANCES
  );

  const createNewRoles = async (roles: RoleWithInstances[]) => {
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
        } catch (err) {
        } finally {
          setSaving(false);
          setEditing(false);
        }
      }}
      onEditClick={() => setEditing(true)}
      onCancelClick={() => {
        setEditing(false);
        setRoles(props.roles);
      }}
      isSaving={isSaving}
      onAddRoleClick={(role: string) => {
        setRoles([
          ...roles,
          {
            name: role,
            roleInstances: roleInstanceDescriptions.map((description) => {
              const name = description === '' ? role : role + ' ' + description;
              return {
                name,
                description,
              };
            }),
          },
        ]);
        setRoleFieldText('');
        setRoleInstanceDescriptions(DEFAULT_ROLE_INSTANCES);
      }}
      roleFieldText={roleFieldText}
      onRoleFieldChange={(role) => setRoleFieldText(role)}
      roleInstanceDescriptions={roleInstanceDescriptions}
      onRoleInstanceDescriptionsChange={(roleInstanceDescriptions) =>
        setRoleInstanceDescriptions(roleInstanceDescriptions)
      }
      onAddInstanceClick={() => {
        setRoleInstanceDescriptions([...roleInstanceDescriptions, '']);
      }}
      onDeleteInstanceClick={(index) => {
        const newRoleInstanceDescriptions = [...roleInstanceDescriptions];
        newRoleInstanceDescriptions.splice(index, 1);
        setRoleInstanceDescriptions(newRoleInstanceDescriptions);
      }}
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
    roleInstanceDescriptions,
    onRoleInstanceDescriptionsChange,
    onRoleFieldChange,
    onAddInstanceClick,
    onDeleteInstanceClick,
  } = props;

  const theme = useTheme();
  const isInvalidRole = roleFieldText.length === 0;

  return (
    <TitledContainer
      title="Roles"
      endComponent={
        <div>
          {!isEditing && (
            <Button variant="outlined" onClick={onEditClick}>
              Edit
            </Button>
          )}
          {isEditing && (
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
          )}
        </div>
      }
    >
      <Stack spacing={2}>
        <Card variant="outlined">
          <List disablePadding>
            {roles.map((role) => (
              <div key={role.name}>
                <ListSubheader>{role.name}</ListSubheader>
                {role.roleInstances.map((roleInstance) => (
                  <ListItem key={roleInstance.name}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText>{roleInstance.name}</ListItemText>
                  </ListItem>
                ))}
                <Divider />
              </div>
            ))}
          </List>
        </Card>
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
                    <Typography
                      variant="h5"
                      color={theme.palette.text.secondary}
                    >
                      Add role
                    </Typography>
                    <TextField
                      autoComplete="off"
                      label="Name"
                      variant="filled"
                      required
                      value={roleFieldText}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        onRoleFieldChange(event.target.value);
                      }}
                    />
                    <Divider flexItem />
                    <List disablePadding>
                      <ListItem disableGutters>
                        <ListItemText inset>
                          <Typography
                            variant="h6"
                            color={theme.palette.text.secondary}
                          >
                            Role variants
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      {roleInstanceDescriptions.map((description, index) => (
                        <ListItem disableGutters>
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <TextField
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  {index + 1}
                                </InputAdornment>
                              ),
                            }}
                            label="Description"
                            variant="filled"
                            autoComplete="off"
                            key={index}
                            value={description}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const newRoleInstanceDescriptions = [
                                ...roleInstanceDescriptions,
                              ];
                              newRoleInstanceDescriptions[index] =
                                event.target.value;
                              onRoleInstanceDescriptionsChange(
                                newRoleInstanceDescriptions
                              );
                            }}
                          />
                          {roleInstanceDescriptions.length > 1 && (
                            <IconButton
                              onClick={() => onDeleteInstanceClick(index)}
                            >
                              <Clear />
                            </IconButton>
                          )}
                        </ListItem>
                      ))}
                      <ListItem disableGutters>
                        <ListItemText inset>
                          <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={onAddInstanceClick}
                          >
                            Add variant
                          </Button>
                        </ListItemText>
                      </ListItem>
                    </List>
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
          </>
        )}
      </Stack>
    </TitledContainer>
  );
}

export default PlannerRolesPageWithAPI;
export { PlannerRolesPage as PlannerRolesPageWithProps };
