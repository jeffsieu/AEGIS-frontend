import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { Backend } from '@typing/backend';

export type ScheduleRowHeaderProps = {
  roleInstance: Backend.RoleInstance;
};

function ScheduleRowHeader(props: ScheduleRowHeaderProps) {
  const { roleInstance } = props;
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
        sx={{ justifyContent: 'left', whiteSpace: 'nowrap' }}
      >
        <Typography color={theme.palette.text.secondary}>
          {roleInstance.name}
        </Typography>
      </Button>
    </ThemeProvider>
  );
}

export default ScheduleRowHeader;
