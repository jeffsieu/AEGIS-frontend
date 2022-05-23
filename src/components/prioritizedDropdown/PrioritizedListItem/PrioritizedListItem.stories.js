import React from 'react';
import PrioritizedListItem from './PrioritizedListItem';

export default {
  title: 'Prioritized Dropdown/Prioritized List Item',
  component: PrioritizedListItem,
  argTypes: {
    available: {
      control: false,
    },
    callsign: {
      control: 'text',
    },
    dutyCount: {
      control: 'number',
    },
    reason: {
      control: 'text',
    },
  },
};

const Template = (args) => (
  <div style={{ maxWidth: '50vw' }}>
    <PrioritizedListItem {...args} />
  </div>
);

export const Available = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Available.args = {
  available: true,
  callsign: 'Daniel',
  dutyCount: 1,
};
Available.argTypes = {
  reason: {
    control: false,
  },
};

export const Unavailable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Unavailable.args = {
  available: false,
  callsign: 'Daniel',
  dutyCount: 1,
  reason: 'Medical Leave',
};
