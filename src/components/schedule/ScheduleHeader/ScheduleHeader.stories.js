import ScheduleHeader from './ScheduleHeader';

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
