import { darkTheme, lightTheme } from 'hummingbird-ui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

export const parameters = {
  chromatic: { disableSnapshot: false },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const argTypes = {
  theme: { options: ['light', 'dark'], control: { type: 'select' } },
};
export const args = { theme: 'light' };

export const decorators = [
  (Story, context) => {
    const theme = context.args.theme === 'light' ? lightTheme : darkTheme;
    theme.typography.button.textTransform = 'none';
    theme.typography.button.fontWeight = 'bold';

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeProvider>
    );
  },
];
