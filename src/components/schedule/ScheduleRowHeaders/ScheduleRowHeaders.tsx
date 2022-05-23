import { Box, IconButton, Typography } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Role } from '@types';
import ScheduleRowHeader from '../ScheduleRowHeader/ScheduleRowHeader';

export type ScheduleRowHeadersProps = {
  roles: Role[];
};

function ScheduleRowHeaders(props: ScheduleRowHeadersProps) {
  const { roles } = props;

  return (
    <Box display="flex" flexDirection="column" justifyContent="end" gap={1}>
      <Box padding={1} display="flex" alignItems="center">
        <Typography variant="subtitle1">Roles</Typography>
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
