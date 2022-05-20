import React from 'react';
import PrioritizedList from './PrioritizedList';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import ModalContainer, { create } from 'react-modal-promise';

export default {
	title: 'Prioritized Dropdown/Prioritized List',
	component: PrioritizedList,
	argTypes: {},
	decorators: [
		(Story) => (
			<ThemeProvider theme={lightTheme}>
				<ModalContainer />
				<CssBaseline />
				<Story />
			</ThemeProvider>
		),
	],
};


const Template = (args) => {
	const popover = create(PrioritizedList);
	function openPopover(event){
		return popover({...args, anchorEl: event.currentTarget}).then(res=>console.log(res)).catch(rej=>console.log(rej));
	}
	return <Button onClick={openPopover}>Popover</Button>
};

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
	qualifiedMembers: [
		{ available: true, callsign: 'Abang', dutyCount: 1 },
		{ available: true, callsign: 'Upin', dutyCount: 7 },
		{ available: false, callsign: 'Ipin', dutyCount: 3, reason: "Medical Leave" },
		{ available: false, callsign: 'Oof', dutyCount: 2, reason: "Medical Leave" },
		{ available: true, callsign: 'Yed', dutyCount: 4 },
		{ available: true, callsign: 'Ym', dutyCount: 6 },
	]
};
