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
    { isAvailable: true, callsign: 'Abang', dutyCount: 1 },
    { isAvailable: true, callsign: 'Upin', dutyCount: 7 },
    {
      isAvailable: false,
      callsign: 'Ipin',
      dutyCount: 3,
      unavailableReason: 'Medical Leave',
    },
    {
      isAvailable: false,
      callsign: 'Oof',
      dutyCount: 2,
      unavailableReason: 'Medical Leave',
    },
    { isAvailable: true, callsign: 'Yed', dutyCount: 4 },
    { isAvailable: true, callsign: 'Ym', dutyCount: 6 },
  ],
};
