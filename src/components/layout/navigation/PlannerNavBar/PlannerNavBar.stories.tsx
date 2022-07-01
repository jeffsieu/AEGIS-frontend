import { ComponentStory } from '@storybook/react';
import PlannerNavBar from './PlannerNavBar';
import { Provider } from 'react-redux';
import store from '@store';

export default {
  title: 'Navigation/Planner Nav Bar',
  component: PlannerNavBar,
  argTypes: {},
};

const Template: ComponentStory<typeof PlannerNavBar> = () => <Provider store={store}><PlannerNavBar /></Provider>;

export const Default = Template.bind({});
Default.args = {};
