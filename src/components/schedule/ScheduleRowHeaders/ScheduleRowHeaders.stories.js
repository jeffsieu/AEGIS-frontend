import ScheduleRowHeaders from './ScheduleRowHeaders';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Row Headers',
  component: ScheduleRowHeaders,
  argTypes: {
    roleNames: {
      control: 'array',
      type: {
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = (args) => <ScheduleRowHeaders {...args} />;

export const Default = Template.bind({});

Default.args = {
  roleNames: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'],
};
