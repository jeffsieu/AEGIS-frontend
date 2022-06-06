import { ComponentStory } from '@storybook/react';
import { PlannerDraftsPageWithProps } from './PlannerDraftsPage';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Planner/Drafts Page',
  component: PlannerDraftsPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.dateLocalizationProvider,
    Decorators.plannerContainerDecorator,
  ],
};

const Template: ComponentStory<typeof PlannerDraftsPageWithProps> = (args) => (
  <PlannerDraftsPageWithProps {...args} />
);

export const Default = Template.bind({});
Default.args = {};
