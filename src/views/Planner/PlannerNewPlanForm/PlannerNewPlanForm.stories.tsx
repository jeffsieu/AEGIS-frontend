import { ComponentStory } from '@storybook/react';
import { PlannerNewPlanFormWithProps } from './PlannerNewPlanForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default {
  title: 'Planner/New Plan Form',
  component: PlannerNewPlanFormWithProps,
  decorators: [
    (Story: any) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
};

const Template: ComponentStory<typeof PlannerNewPlanFormWithProps> = (args) => (
  <PlannerNewPlanFormWithProps {...args} />
);

const months = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).startOf('month')
);

export const Default = Template.bind({});
Default.args = {
  roles: ['A1', 'A2'],
  months: months,
  defaultMonth: months[0],
};
