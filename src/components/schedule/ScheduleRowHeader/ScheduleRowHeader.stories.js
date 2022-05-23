import ScheduleRowHeader from './ScheduleRowHeader';

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
};

const Template = (args) => <ScheduleRowHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  roleName: 'A1',
};
