import ScheduleRowHeader from './ScheduleRowHeader';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Row Header',
  component: ScheduleRowHeader,
  argTypes: {
    roleName: {
      control: 'text',
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

const Template = (args) => <ScheduleRowHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  roleName: 'A1',
};
