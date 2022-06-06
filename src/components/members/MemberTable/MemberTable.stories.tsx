import MemberTable from './MemberTable';
import { ComponentStory } from '@storybook/react';

export default {
  title: 'Members/Member Table',
  component: MemberTable,
};

const Template: ComponentStory<typeof MemberTable> = (args) => {
  return <MemberTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  members: [
    {
      callsign: 'Alpha',
      roles: {
        A1: true,
        A2: true,
        A3: false,
        A4: false,
      },
    },
    {
      callsign: 'Bravo',
      roles: {
        A1: true,
        A2: false,
        A3: true,
        A4: false,
      },
    },
    {
      callsign: 'Charlie',
      roles: {
        A1: false,
        A2: true,
        A3: false,
        A4: true,
      },
    },
  ],
};
