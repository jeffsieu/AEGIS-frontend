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
      callsign: 'Upin',
      dates: [
        [new Date('2022-05-01'), new Date('2022-05-01')],
        [new Date('2022-05-02'), new Date('2022-05-05')],
      ],
      reason: 'Chao geng',
    },
    {
      callsign: 'Ipin',
      dates: [
        [new Date('2022-05-01'), new Date('2022-05-01')],
        [new Date('2022-05-02'), new Date('2022-05-05')],
      ],
      reason: 'Go back to village, approved by OC',
    },
  ],
};
