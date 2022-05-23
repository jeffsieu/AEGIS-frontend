import { ComponentStory } from '@storybook/react';
import PrioritizedListItem from './PrioritizedListItem';

export default {
  title: 'Prioritized Dropdown/Prioritized List Item',
  component: PrioritizedListItem,
};

const Template: ComponentStory<typeof PrioritizedListItem> = (args) => (
  <div style={{ maxWidth: '50vw' }}>
    <PrioritizedListItem {...args} />
  </div>
);

export const Available = Template.bind({});
Available.args = {
  isAvailable: true,
  callSign: 'Daniel',
  dutyCount: 1,
};
Available.argTypes = {
  isAvailable: {
    control: false,
  },
  unavailableReason: {
    control: false,
  },
};

export const Unavailable = Template.bind({});
Unavailable.args = {
  isAvailable: false,
  callSign: 'Daniel',
  dutyCount: 1,
  unavailableReason: 'Medical Leave',
};
Unavailable.argTypes = {
  isAvailable: {
    control: false,
  },
};
