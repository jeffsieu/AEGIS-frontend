import { ComponentStory } from '@storybook/react';
import { PlannerDraftsPageWithProps } from './PlannerDraftsPage';
import dayjs from 'dayjs';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { Decorators } from '@utils/storybook/decorators';

const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoles = ['A1', 'A2', 'A3', 'A4', 'A5'];

export default {
  title: 'Planner/Drafts',
  component: PlannerDraftsPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.plannerContainerDecorator],
};

const Template: ComponentStory<typeof PlannerDraftsPageWithProps> = (args) => {
  return <PlannerDraftsPageWithProps {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  startDate: mockStartDate,
  endDate: mockEndDate,
  roles: mockRoles,
  scheduleItemsByDay: createMockScheduleItems(
    mockStartDate,
    mockEndDate,
    mockRoles
  ),
};
