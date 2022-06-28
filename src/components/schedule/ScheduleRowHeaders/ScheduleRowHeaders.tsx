import { Box, Typography, useTheme } from '@mui/material';
import ScheduleRowHeader from '../ScheduleRowHeader/ScheduleRowHeader';
import ScheduleRoleFilterButton from '../ScheduleRoleFilterButton/ScheduleRoleFilterButton';
import { useMemo } from 'react';
import { Backend } from '@typing/backend';

export type ScheduleRowHeadersProps =
  | {
      roleInstances: Backend.RoleInstance[];
      sticky?: boolean;
    } & (
      | {
          canFilter: false;
          selectedRoleInstances?: Backend.RoleInstance[];
        }
      | {
          canFilter: true;
          selectedRoleInstances: Backend.RoleInstance[];
          onSelectedRoleInstancesChange: (
            roles: Backend.RoleInstance[]
          ) => void;
        }
    );

function ScheduleRowHeaders(props: ScheduleRowHeadersProps) {
  const { roleInstances, canFilter, sticky = false } = props;
  const theme = useTheme();

  const visibleRoleInstances = useMemo(() => {
    return canFilter
      ? roleInstances.filter((role) =>
          props.selectedRoleInstances.includes(role)
        )
      : roleInstances;
  }, [canFilter, props.selectedRoleInstances, roleInstances]);

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
            roleInstances={roleInstances}
            selectedRoleInstances={props.selectedRoleInstances}
            onSelectedRoleInstancesChange={props.onSelectedRoleInstancesChange}
          />
        )}
      </Box>
      {visibleRoleInstances.map((roleInstance, index) => {
        return <ScheduleRowHeader key={index} roleInstance={roleInstance} />;
      })}
    </Box>
  );
}

export default ScheduleRowHeaders;
