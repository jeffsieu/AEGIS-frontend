import { ComponentStory } from '@storybook/react';
import { AvailableQualifiedMember } from '@types';
import { MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';
import ScheduleItem from './ScheduleItem';

export default {
  title: 'Schedule/Schedule Item',
  component: ScheduleItem,
  argTypes: {
    isRequired: {
      control: 'boolean',
    },
  },
};

const Template: ComponentStory<typeof ScheduleItem> = (args) => (
  <ScheduleItem {...args} />
);

export const Assigned = Template.bind({});
Assigned.args = {
  isRequired: true,
  qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
  assignedMember: MOCK_QUALIFIED_MEMBERS.find(
    (member): member is AvailableQualifiedMember => member.isAvailable
  )!,
};

export const Pending = Template.bind({});
Pending.args = {
  qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
  isRequired: true,
  assignedMember: null,
};
Pending.argTypes = {
  isRequired: {
    control: false,
  },
};

export const Empty = Template.bind({});
Empty.args = {
  isRequired: false,
};
Empty.argTypes = {
  isRequired: {
    control: false,
  },
};
