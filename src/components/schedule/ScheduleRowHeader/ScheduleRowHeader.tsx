import {
  Button,
  Typography,
  createTheme,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { Role } from '@typing';

export type ScheduleRowHeaderProps = {
  role: Role;
};

function ScheduleRowHeader(props: ScheduleRowHeaderProps) {
  const { role } = props;
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
        <Typography color={theme.palette.text.secondary}>{role}</Typography>
      </Button>
    </ThemeProvider>
  );
}

export default ScheduleRowHeader;
