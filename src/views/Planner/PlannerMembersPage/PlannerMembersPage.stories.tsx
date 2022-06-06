import { ComponentStory } from '@storybook/react';
import { PlannerMembersPageWithProps } from './PlannerMembersPage';
import { Decorators } from '@utils/storybook/decorators';
import { Default as MemberTableDefault } from '@components/members/MemberTable/MemberTable.stories';

export default {
  title: 'Planner/Members Page',
  component: PlannerMembersPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.dateLocalizationProvider,
    Decorators.plannerContainerDecorator,
  ],
};

const Template: ComponentStory<typeof PlannerMembersPageWithProps> = (args) => (
  <PlannerMembersPageWithProps {...args} />
);

export const Default = Template.bind({});
// Reuse args from MemberTable
Default.args = MemberTableDefault.args;

export const Empty = Template.bind({});
Empty.args = {
  members: [],
};
