import { ComponentStory } from '@storybook/react';
import { MemberRequestPageWithProps as MemberRequestsPage } from './MemberRequestsPage';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Member/Requests Page',
  component: MemberRequestsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.memberContainerDecorator],
};

const Template: ComponentStory<typeof MemberRequestsPage> = (args) => (
  <MemberRequestsPage {...args} />
);


const mockRequests = [
  {
    id: 0,
    callsign: 'Upin',
    startDate: new Date('2020-05-01'),
    endDate: new Date('2020-05-05'),
    reason: 'Chao geng',
    type: 'Personal',
  },
  {
    id: 1,
    callsign: 'Ipin',
    startDate: new Date('2020-05-01'),
    endDate: new Date('2020-05-05'),
    reason: 'Go back to village, approved by OC',
    type: 'Personal',
  },
]

const mockMembers = [
  { id: 123,
    createdAt: '2020-05-01',
    updatedAt: '2020-05-01',
    callsign: 'Upin',
    sqn: '123',
    type: 'member',
  },
  { id: 124,
    createdAt: '2020-05-01',
    updatedAt: '2020-05-01',
    callsign: 'Ipin',
    sqn: '123',
    type: 'member',
  }
]

const mockPeriods = Object.assign({}, ...mockMembers.map((mockMember) => ({ member: mockMember })), mockRequests);


// Page not loading, component makes calls to query db to get members and fails
export const Default = Template.bind({});
Default.args = {
  periods: mockPeriods,
  members: mockMembers,
  deleteRequests: undefined,
  updateRequest: undefined
};
