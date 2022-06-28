import { ComponentStory } from '@storybook/react';
import { PlannerDraftEditorPageWithProps } from './PlannerDraftEditorPage';
import dayjs from 'dayjs';
import { createMockScheduleItems } from '@utils/mock-data/schedule';
import { Decorators } from '@utils/storybook/decorators';

const mockStartDate = dayjs('2022-04-01').toDate();
const mockEndDate = dayjs('2022-04-14').toDate();
const mockRoleInstances = ['A1', 'A2', 'A3', 'A4', 'A5'].map((name) => ({
  name,
  description: '',
}));

export default {
  title: 'Planner/Draft Editor',
  component: PlannerDraftEditorPageWithProps,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.plannerContainerDecorator],
};

const Template: ComponentStory<typeof PlannerDraftEditorPageWithProps> = (
  args
) => {
  return <PlannerDraftEditorPageWithProps {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  startDate: mockStartDate,
  endDate: mockEndDate,
  roleInstances: mockRoleInstances,
  scheduleItemsByDay: createMockScheduleItems(
    mockStartDate,
    mockEndDate,
    mockRoleInstances
  ),
};
