import { ComponentStory } from '@storybook/react';
import { MemberRequestPageWithProps as MemberRequestsPage } from './MemberRequestsPage';
import { Decorators } from '@utils/storybook/decorators';

export default {
  title: 'Member/Requests Page',
  component: MemberRequestsPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [Decorators.memberContainerDecorator],
};

const Template: ComponentStory<typeof MemberRequestsPage> = (args) => (
  <MemberRequestsPage {...args} />
);

export const Default = Template.bind({});
Default.args = {};
