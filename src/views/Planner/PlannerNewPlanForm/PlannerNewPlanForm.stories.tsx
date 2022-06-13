import { ComponentStory } from '@storybook/react';
import { PlannerNewPlanFormWithProps } from './PlannerNewPlanForm';
import dayjs from 'dayjs';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Planner/New Plan Form',
  component: PlannerNewPlanFormWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.dateLocalizationProvider,
    Decorators.plannerContainerDecorator,
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
  roles: ['A1', 'A2'].map((name) => ({ name })),
  months: months,
  defaultMonth: months[0],
};
