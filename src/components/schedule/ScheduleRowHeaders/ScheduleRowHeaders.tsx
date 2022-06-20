import { Box, Typography, useTheme } from '@mui/material';
import { Role } from '@typing';
import ScheduleRowHeader from '../ScheduleRowHeader/ScheduleRowHeader';
import ScheduleRoleFilterButton from '../ScheduleRoleFilterButton/ScheduleRoleFilterButton';
import { useMemo } from 'react';

export type ScheduleRowHeadersProps =
  | {
      roles: Role[];
      sticky?: boolean;
    } & (
      | {
          canFilter: false;
          selectedRoles?: Role[];
        }
      | {
          canFilter: true;
          selectedRoles: Role[];
          onSelectedRolesChange: (roles: Role[]) => void;
        }
    );

function ScheduleRowHeaders(props: ScheduleRowHeadersProps) {
  const { roles, canFilter, sticky = false } = props;
  const theme = useTheme();

  const visibleRoles = useMemo(() => {
    return canFilter
      ? roles.filter((role) => props.selectedRoles.includes(role))
      : roles;
  }, [canFilter, props.selectedRoles, roles]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="end"
      gap={1}
      paddingX={sticky ? 2 : undefined}
      position={sticky ? 'sticky' : undefined}
      left={sticky ? 0 : undefined}
      zIndex={sticky ? 1 : undefined}
      sx={
        sticky
          ? {
              background: `linear-gradient(90deg, ${theme.palette.background.paper} 90%, transparent)`,
            }
          : undefined
      }
    >
      <Box padding={1} display="flex" alignItems="center">
        <Typography variant="overline">Roles</Typography>
        {canFilter && (
          <ScheduleRoleFilterButton
            roles={roles}
            selectedRoles={props.selectedRoles}
            onSelectedRolesChange={props.onSelectedRolesChange}
          />
        )}
      </Box>
      {visibleRoles.map((role, index) => {
        return <ScheduleRowHeader key={index} role={role} />;
      })}
    </Box>
  );
}

export default ScheduleRowHeaders;
