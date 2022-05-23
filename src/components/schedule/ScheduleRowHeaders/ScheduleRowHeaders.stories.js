import ScheduleRowHeaders from './ScheduleRowHeaders';

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
};

const Template = (args) => <ScheduleRowHeaders {...args} />;

export const Default = Template.bind({});

Default.args = {
  roleNames: ['A1', 'A2', 'A3', 'B1', 'B2', 'B3'],
};
