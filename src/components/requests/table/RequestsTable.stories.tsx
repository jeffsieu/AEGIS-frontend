import { ComponentStory } from '@storybook/react';
import { AvailableQualifiedMember } from '@typing';
import { MOCK_QUALIFIED_MEMBERS } from '@utils/mock-data/schedule';
import dayjs from 'dayjs';
import RequestsTable from './RequestsTable';

export default {
  title: 'Requests/Requests Table',
  component: RequestsTable,
  argTypes: {},
};

const Template: ComponentStory<typeof RequestsTable> = (args) => (
  <RequestsTable {...args}/>
);

export const Default = Template.bind({});
Default.args = {
	requests: [
		{callsign: "Upin", dates: [[dayjs('2022-05-01'),dayjs('2022-05-01')], [dayjs('2022-05-02'), dayjs('2022-05-05')]], reason: "Chao geng"},
		{callsign: "Ipin", dates: [[dayjs('2022-05-01'),dayjs('2022-05-01')], [dayjs('2022-05-02'), dayjs('2022-05-05')]], reason: "Go back to village, approved by OC"}
	]
};
