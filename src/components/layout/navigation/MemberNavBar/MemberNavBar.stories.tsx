import { ComponentStory } from '@storybook/react';
import MemberNavBar from './MemberNavBar';

export default {
  title: 'Navigation/Member Nav Bar',
  component: MemberNavBar,
  argTypes: {},
};

const Template: ComponentStory<typeof MemberNavBar> = () => <MemberNavBar />;

export const Default = Template.bind({});
Default.args = {};
