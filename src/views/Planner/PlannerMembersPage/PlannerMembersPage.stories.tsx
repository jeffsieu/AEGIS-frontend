import { ComponentStory } from '@storybook/react';
import PlannerMembersPage from './PlannerMembersPage';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Planner/Members Page',
  component: PlannerMembersPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.dateLocalizationProvider,
    Decorators.plannerContainerDecorator,
  ],
};

const Template: ComponentStory<typeof PlannerMembersPage> = (args) => (
  <PlannerMembersPage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
