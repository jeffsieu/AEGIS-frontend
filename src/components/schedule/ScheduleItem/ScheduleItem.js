import { Button, createTheme, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { neutrals } from 'hummingbird-ui';
import { useTheme } from '@mui/material';
import {
  COLOR_SCHEDULE_ITEM_FILLED,
  COLOR_SCHEDULE_ITEM_PENDING,
} from '../../../utils/constants/schedule';

function ScheduleItem(props) {
  const { isRequired, assignedCallsign } = props;

  const theme = useTheme();
  const customButtonTheme = createTheme({
    palette: {
      success: {
        main: COLOR_SCHEDULE_ITEM_FILLED,
      },
      warning: {
        main: COLOR_SCHEDULE_ITEM_PENDING,
      },
      disabled: {},
      action: {
        disabled: neutrals[100],
        disabledBackground: neutrals[100],
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });

  if (assignedCallsign !== null) {
    return (
      <ThemeProvider theme={customButtonTheme}>
        <Button variant="contained" color="success" disableElevation>
          {assignedCallsign}
        </Button>
      </ThemeProvider>
    );
  } else {
    if (isRequired) {
      return (
        <ThemeProvider theme={customButtonTheme}>
          <Button variant="contained" color="warning" disableElevation>
            Pending
          </Button>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={customButtonTheme}>
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.background.paper }}
            disabled
          >
            Empty {/* Placeholder text to ensure button height is correct */}
          </Button>
        </ThemeProvider>
      );
    }
  }
}

ScheduleItem.propTypes = {
  isRequired: PropTypes.bool.isRequired,
  assignedCallsign: PropTypes.string,
};

export default ScheduleItem;
