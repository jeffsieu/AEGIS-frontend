import NavigationBar from '.';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'General/Navigation Bar',
  component: NavigationBar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story: any) => (
      <div>
        <Story />
        {/* <div
          style={{
            backgroundColor: 'grey',
            width: '100%',
            height: '50vh',
            textAlign: 'center',
            verticalAlign: 'center',
          }}
        >
          Other content.
        </div> */}
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof NavigationBar> = (args) => (
  <NavigationBar {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
      label: 'New plan',
      onClick: () => {},
    },
  ],
};
