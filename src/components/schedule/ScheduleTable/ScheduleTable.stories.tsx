import { ComponentStory } from '@storybook/react';
import { AvailableQualifiedMember } from '@typing';
import { MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';
import { ScheduleItemPropsWithoutCallback } from '../ScheduleItem/ScheduleItem';
import ScheduleTable from './ScheduleTable';

export default {
  title: 'Schedule/Schedule Table',
  component: ScheduleTable,
  argTypes: {
    startDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    endDate: {
      control: 'date',
      type: {
        required: true,
      },
    },
    roles: {
      control: 'array',
      type: {
        required: true,
      },
    },
  },
};

const Template: ComponentStory<typeof ScheduleTable> = ({
  startDate,
  endDate,
  ...restArgs
}) => (
  <ScheduleTable
    startDate={new Date(startDate)}
    endDate={new Date(endDate)}
    {...restArgs}
  />
);

export const Default = Template.bind({});
Default.args = {
  startDate: new Date(2020, 0, 1),
  endDate: new Date(2020, 0, 14),
  roleInstances: ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'].map(
    (name) => ({
      name,
      description: '',
    })
  ),
  scheduleItemsByDay: Array.from({ length: 14 }, (_, dayIndex) =>
    Array.from({ length: 5 }, (_, roleIndex) => {
      return {
        isRequired: roleIndex <= 1 || dayIndex % 3 === 0,
        qualifiedMembers: MOCK_QUALIFIED_MEMBERS,
        assignedMember:
          (dayIndex + roleIndex) % 3 === 0
            ? MOCK_QUALIFIED_MEMBERS.find(
                (member): member is AvailableQualifiedMember =>
                  member.isAvailable
              )!
            : null,
      } as ScheduleItemPropsWithoutCallback;
    })
  ),
};
