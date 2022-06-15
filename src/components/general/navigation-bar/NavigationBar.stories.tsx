import NavigationBar from '.';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'General/Navigation Bar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template: ComponentStory<typeof NavigationBar> = (args) => (
  <NavigationBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: {
    label: 'AEGIS | Planner',
    onClick: () => {},
  },
  links: [
    {
      label: 'Home',
      onClick: () => {},
    },
    {
      label: 'Published',
      onClick: () => {},
    },
    {
      label: 'Drafts',
      onClick: () => {},
    },
    {
      label: 'Members',
      onClick: () => {},
    },
  ],
  actions: [
    {
      label: 'Draft new plan',
      onClick: () => {},
    },
  ],
};
