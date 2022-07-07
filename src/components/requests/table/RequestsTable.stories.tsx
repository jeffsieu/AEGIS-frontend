import { ComponentStory } from '@storybook/react';
import RequestsTable from './RequestsTable';

export default {
  title: 'Requests/Requests Table',
  component: RequestsTable,
  argTypes: {},
};

const Template: ComponentStory<typeof RequestsTable> = (args) => (
  <RequestsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  requests: [
    {
      id: 0,
      callsign: 'Upin',
      startDate: new Date('2020-05-01'),
      endDate: new Date('2020-05-05'),
      reason: 'Chao geng',
      type: 'Personal',
    },
    {
      id: 1,
      callsign: 'Ipin',
      startDate: new Date('2020-05-01'),
      endDate: new Date('2020-05-05'),
      reason: 'Go back to village, approved by OC',
      type: 'Personal',
    },
  ],
  members: [
    { id: 123,
      createdAt: '2020-05-01',
      updatedAt: '2020-05-01',
      callsign: 'Upin',
      sqn: '123',
      type: 'member',
    },
    { id: 124,
      createdAt: '2020-05-01',
      updatedAt: '2020-05-01',
      callsign: 'Ipin',
      sqn: '123',
      type: 'member',
    }
  ]
};
