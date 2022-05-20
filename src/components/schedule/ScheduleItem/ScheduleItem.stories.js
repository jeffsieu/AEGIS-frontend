import ScheduleItem from './ScheduleItem';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Item',
  component: ScheduleItem,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    assignedCallsign: {
      control: 'text',
    },
    isRequired: {
      control: 'boolean',
    },
  },
};

const Template = (args) => <ScheduleItem {...args} />;

export const Assigned = Template.bind({});
Assigned.args = {
  assignedCallsign: 'Daniel',
};

export const Pending = Template.bind({});
Pending.args = {
  assignedCallsign: null,
  isRequired: true,
};
Pending.argTypes = {
  assignedCallsign: {
    control: false,
  },
  isRequired: {
    control: false,
  },
};

export const Empty = Template.bind({});
Empty.args = {
  assignedCallsign: null,
  isRequired: false,
};
Empty.argTypes = {
  assignedCallsign: {
    control: false,
  },
  isRequired: {
    control: false,
  },
};
