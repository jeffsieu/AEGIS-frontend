import { ComponentStory } from '@storybook/react';
import { AvailableQualifiedMember } from '@typing';
import { MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';
import ScheduleColumns from './ScheduleColumns';

export default {
  title: 'Schedule/Schedule Columns',
  component: ScheduleColumns,
  argTypes: {
    date: {
      control: 'date',
      type: {
        required: true,
      },
    },
    scheduleItems: {
      control: 'array',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleColumns> = ({
  date,
  ...restArgs
}) => <ScheduleColumns date={new Date(date)} {...restArgs} />;

export const Default = Template.bind({});
Default.args = {
  date: new Date(2020, 0, 1),
  scheduleItems: [
    {
      isRequired: false,
      assignedMember: null,
    },
    {
      isRequired: true,
      qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
      assignedMember: null,
      onMemberSelected: () => {},
    },
    {
      isRequired: true,
      qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
      assignedMember: MOCK_QUALIFIED_MEMBERS.find(
        (member): member is AvailableQualifiedMember => member.isAvailable
      )!,
      onMemberSelected: () => {},
    },
  ],
};
