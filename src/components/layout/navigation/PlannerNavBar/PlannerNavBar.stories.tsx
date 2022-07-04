import { ComponentStory } from '@storybook/react';
import PlannerNavBar from './PlannerNavBar';

export default {
  title: 'Navigation/Planner Nav Bar',
  component: PlannerNavBar,
  argTypes: {},
};

const Template: ComponentStory<typeof PlannerNavBar> = () =><PlannerNavBar />;

export const Default = Template.bind({});
Default.args = {};
