import PrioritizedList from './PrioritizedList';
import PrioritizedListPopover from './PrioritizedListPopover';
import { Button } from '@mui/material';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Prioritized Dropdown/Prioritized List',
  component: PrioritizedList,
};

const Template: ComponentStory<typeof PrioritizedListPopover> = (args) => {
  return (
    <PrioritizedListPopover {...args}>
      {(openPopover) => <Button onClick={openPopover}>Open popover</Button>}
    </PrioritizedListPopover>
  );
};

export const Main = Template.bind({});
Main.args = {
  qualifiedMembers: [
    { isAvailable: true, callSign: 'Abang', dutyCount: 1 },
    { isAvailable: true, callSign: 'Upin', dutyCount: 7 },
    {
      isAvailable: false,
      callSign: 'Ipin',
      dutyCount: 3,
      unavailableReason: 'Medical Leave',
    },
    {
      isAvailable: false,
      callSign: 'Oof',
      dutyCount: 2,
      unavailableReason: 'Medical Leave',
    },
    { isAvailable: true, callSign: 'Yed', dutyCount: 4 },
    { isAvailable: true, callSign: 'Ym', dutyCount: 6 },
  ],
};
