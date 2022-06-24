import {
  alpha,
  createTheme,
  darken,
  lighten,
  Theme,
  useTheme,
} from '@mui/material';

export function getCardColor(theme: Theme): string {
  return theme.palette.mode === 'light'
    ? darken(theme.palette.background.paper, 0.03)
    : lighten(theme.palette.background.paper, 0.1);
}

export function useCustomButtonTheme() {
  const theme = useTheme();

  return createTheme(theme, {
    palette: {
      success: {
        main: alpha(theme.palette.success.main, 0.5),
        light: alpha(theme.palette.success.light, 0.5),
        dark: alpha(theme.palette.success.dark, 0.5),
        contrastText: theme.palette.text.secondary,
      },
      warning: {
        main: alpha(theme.palette.warning.main, 0.5),
        light: alpha(theme.palette.warning.light, 0.5),
        dark: alpha(theme.palette.warning.dark, 0.5),
        contrastText: theme.palette.text.secondary,
      },
      error: {
        main: alpha(theme.palette.error.main, 0.5),
        light: alpha(theme.palette.error.light, 0.5),
        dark: alpha(theme.palette.error.dark, 0.5),
        contrastText: theme.palette.text.primary,
      },
      action: {
        disabled: 'transparent',
        disabledBackground: theme.palette.action.disabledBackground,
      },
    },
    typography: {
      button: {
        textTransform: 'none',
      },
    },
  });
}
