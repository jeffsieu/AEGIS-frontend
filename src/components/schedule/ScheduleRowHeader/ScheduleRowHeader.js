import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

function ScheduleRowHeader(props) {
  const { roleName } = props;
  const theme = useTheme();
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
        <Typography color={theme.palette.text.secondary}>{roleName}</Typography>
      </Button>
    </ThemeProvider>
  );
}

ScheduleRowHeader.propTypes = {
  roleName: PropTypes.string.isRequired,
};

export default ScheduleRowHeader;
