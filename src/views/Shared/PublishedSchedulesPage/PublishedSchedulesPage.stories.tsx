import { ComponentStory } from '@storybook/react';
import { PublishedSchedulesPageWithProps } from './PublishedSchedulesPage';
import dayjs from 'dayjs';
import { createMockScheduleItems, MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';
import { Decorators } from '@utils/storybook/decorators';
import { Backend } from '@typing/backend';

export default {
  title: 'Planner/Published Schedules',
  component: PublishedSchedulesPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.plannerContainerDecorator],
};

const Template: ComponentStory<typeof PublishedSchedulesPageWithProps> = (
  args
) => <PublishedSchedulesPageWithProps {...args} />;

const mockSchedules: Backend.Schedule[] = Array.from({ length: 3 }, (_, i) => {
  const startDate = dayjs('2022-01-01').month(i).toDate();
  const endDate = dayjs('2022-01-14').month(i).toDate();
  const roles = ['A1', 'A2', 'A3', 'A4', 'A5'].map((name) => ({ name, }));
  return {
    startDate,
    endDate,
    roles,
    scheduleItemsByDay: createMockScheduleItems(startDate, endDate, roles),
    month: dayjs(startDate).format('YYYY-MM'),
    isPublished: true,
    duties: [],
  };
}).reverse();

const creationDates = {
  createdAt: '2020-01-01T00:00:00.000Z',
  updatedAt: '2020-01-01T00:00:00.000Z',
};

const mockRoleInstances = [
  {
    id: 1,
    name: 'A1',
    description: '',
    roleId: 1,
    role: {
      id: 1,
      name: 'A1',
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: 2,
    name: 'A2',
    description: '',
    roleId: 2,
    role: {
      id: 2,
      name: 'A2',
      createdAt: '',
      updatedAt: '',
    },
  },
  {
    id: 3,
    name: 'A3',
    description: '',
    roleId: 3,
    role: {
      id: 3,
      name: 'A3',
      createdAt: '',
      updatedAt: '',
    },
  },
].map((role) => ({ ...role, ...creationDates }))

export const Default = Template.bind({});
Default.args = {
  schedules: mockSchedules,
  roleInstances: mockRoleInstances,
  members: undefined
};
