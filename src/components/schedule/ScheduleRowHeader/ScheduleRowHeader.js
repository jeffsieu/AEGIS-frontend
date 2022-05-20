import { Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import { neutrals } from 'hummingbird-ui';
import PropTypes from 'prop-types';

function ScheduleRowHeader(props) {
  const { roleName } = props;
  const customButtonTheme = createTheme({
    typography: {
      button: {
        textTransform: 'none', // prevent capitalization
      },
    },
  });

  // Also using a Button for row header to ensure same height as the row items.
  return (
    <ThemeProvider theme={customButtonTheme}>
      <Button
        disableRipple
        disableTouchRipple
        disabled
        sx={{ justifyContent: 'left' }}
      >
        <Typography color={neutrals[300]}>{roleName}</Typography>
      </Button>
    </ThemeProvider>
  );
}

ScheduleRowHeader.propTypes = {
  roleName: PropTypes.string.isRequired,
};

export default ScheduleRowHeader;
