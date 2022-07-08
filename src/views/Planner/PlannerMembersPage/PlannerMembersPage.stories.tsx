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

const mockRoles = [{
  id: 2,
  name: 'A2',
  createdAt: '',
  updatedAt: '',
  }, 
  {
  id: 1,
  name: 'A1',
  createdAt: '',
  updatedAt: '',
  },
]

export const Default = Template.bind({});
// Reuse args from MemberTable
Default.args = Object.assign({},MemberTableDefault.args,{
  roles: mockRoles,
  isEditing: false,
  isSaving: false,
  onSaveClick: () => Promise.resolve(),
  onEditClick: () => {},
  onCancelClick: () => {},
  onAddMemberClick: () => {},
  callsignFieldText: 'Test',
  onCallsignChange: () => {},
  searchQuery: '',
  onSearchQueryChange: () => {},
});
