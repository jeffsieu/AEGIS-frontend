import { Box, IconButton, Typography, useTheme } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Role } from '@typing';
import ScheduleRowHeader from '../ScheduleRowHeader/ScheduleRowHeader';

export type ScheduleRowHeadersProps = {
  roles: Role[];
  sticky?: boolean;
};

function ScheduleRowHeaders(props: ScheduleRowHeadersProps) {
  const { roles, sticky = false } = props;
  const theme = useTheme();

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
        <IconButton>
          <FilterAltOutlinedIcon />
        </IconButton>
      </Box>
      {roles.map((role, index) => {
        return <ScheduleRowHeader key={index} role={role} />;
      })}
    </Box>
  );
}

export default ScheduleRowHeaders;
