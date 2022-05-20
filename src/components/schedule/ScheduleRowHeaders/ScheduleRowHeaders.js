import { Box, IconButton, Typography } from '@mui/material';
import ScheduleRowHeader from '../ScheduleRowHeader/ScheduleRowHeader';
import PropTypes from 'prop-types';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

function ScheduleRowHeaders(props) {
  const { roleNames } = props;

  return (
    <Box display="flex" flexDirection="column" justifyContent="end" gap={1}>
      <Box padding={1} display="flex" alignItems="center">
        <Typography variant="subtitle1">Roles</Typography>
        <IconButton>
          <FilterAltOutlinedIcon />
        </IconButton>
      </Box>
      {roleNames.map((roleName, index) => {
        return <ScheduleRowHeader key={index} roleName={roleName} />;
      })}
    </Box>
  );
}

ScheduleRowHeaders.propTypes = {
  roleNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ScheduleRowHeaders;
