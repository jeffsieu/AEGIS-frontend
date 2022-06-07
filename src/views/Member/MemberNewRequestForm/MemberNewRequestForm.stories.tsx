import { ComponentStory } from '@storybook/react';
import MemberNewRequestForm from './MemberNewRequestForm';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Member/New Request',
  component: MemberNewRequestForm,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Decorators.memberContainerDecorator,
    Decorators.dateLocalizationProvider,
  ],
};

const Template: ComponentStory<typeof MemberNewRequestForm> = (args) => (
  <MemberNewRequestForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
