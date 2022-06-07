import { darken, lighten, Theme } from '@mui/material';

export function getCardColor(theme: Theme): string {
  return theme.palette.mode === 'light'
    ? darken(theme.palette.background.paper, 0.03)
    : lighten(theme.palette.background.paper, 0.1);
}
