import ScheduleHeader from './ScheduleHeader';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Header',
  component: ScheduleHeader,
  argTypes: {
    startDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    endDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    progress: {
      control: 'number',
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

const Template = ({ startDate, endDate, ...restArgs }) => (
  <ScheduleHeader
    startDate={new Date(startDate)}
    endDate={new Date(endDate)}
    {...restArgs}
  />
);

export const Default = Template.bind({});
Default.args = {
  startDate: '2020-04-01',
  endDate: '2020-04-14',
  progress: 40,
  scheduleItems: [
    {
      isRequired: false,
      assignedCallsign: 'Romeo',
    },
    {
      isRequired: true,
      assignedCallsign: null,
    },
    {
      isRequired: false,
      assignedCallsign: null,
    },
  ],
};
