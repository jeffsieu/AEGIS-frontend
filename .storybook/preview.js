import { darkTheme, lightTheme } from 'hummingbird-ui';
import { ThemeProvider } from '@mui/material';

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
    return (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    );
  },
];
