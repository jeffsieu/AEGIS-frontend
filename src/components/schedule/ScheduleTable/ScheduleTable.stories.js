import ScheduleTable from './ScheduleTable';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Table',
  component: ScheduleTable,
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

const Template = ({ startDate, endDate, ...restArgs }) => (
  <ScheduleTable
    startDate={new Date(startDate)}
    endDate={new Date(endDate)}
    {...restArgs}
  />
);

export const Default = Template.bind({});
Default.args = {
  startDate: '2020-01-01',
  endDate: '2020-01-14',
  roleNames: ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'],
  scheduleItemsByDay: Array.from({ length: 14 }, (_, dayIndex) =>
    Array.from({ length: 5 }, (_, roleIndex) => {
      return {
        isRequired: roleIndex <= 1,
        assignedCallsign: (dayIndex + roleIndex) % 3 === 0 ? 'Romeo' : null,
      };
    })
  ),
};
