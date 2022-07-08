import { act, fireEvent, getByText, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { AsyncButton } from ".";

test('renders component', ()=>{
	render(<AsyncButton asyncRequest={function (): Promise<void> {
		return new Promise<void>((res, rej) => {
			res();
		})
	} }/>);
});

test('async button click works', async ()=>{
	let isChanged = false;
	const container = render(<AsyncButton asyncRequest={async () => {
		await new Promise<void>((res, rej) => setTimeout(res, 1000))
		isChanged = true;
	} }>test</AsyncButton>);

	await act(async () => {
		fireEvent(
			getByText(container.baseElement, 'test'),
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			}),
		)

		expect(isChanged).toBe(false);

		await new Promise<void>((res, rej) => setTimeout(res, 1000))

		expect(isChanged).toBe(true);
	});
	
});