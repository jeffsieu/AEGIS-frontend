import React from 'react';
import PrioritizedList from './PrioritizedList';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
	title: 'Prioritized Dropdown/Prioritized List',
	component: PrioritizedList,
	argTypes: {},
	decorators: [
		(Story) => (
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<Story />
			</ThemeProvider>
		),
	],
};

const Template = (args) => <PrioritizedList {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
	qualifiedMembers: [
		{ available: true, callsign: 'Abang', dutyCount: 1 },
		{ available: true, callsign: 'Upin', dutyCount: 7 },
		{ available: false, callsign: 'Ipin', dutyCount: 3 },
		{ available: false, callsign: 'Oof', dutyCount: 2 },
		{ available: true, callsign: 'Yed', dutyCount: 4 },
		{ available: true, callsign: 'Ym', dutyCount: 6 },
	],
	onSelect: (member) => console.log(`${member.callsign} was selected`),
};
