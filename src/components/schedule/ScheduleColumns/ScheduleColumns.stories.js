import ScheduleColumns from './ScheduleColumns';

export default {
  title: 'Schedule/Schedule Columns',
  component: ScheduleColumns,
  argTypes: {
    date: {
      control: 'date',
      type: {
        required: true,
      },
    },
    scheduleItems: {
      control: 'array',
      type: {
        required: true,
      },
    },
  },
};

const Template = ({ date, ...restArgs }) => (
  <ScheduleColumns date={new Date(date)} {...restArgs} />
);

export const Default = Template.bind({});
Default.args = {
  date: '2020-01-01',
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
