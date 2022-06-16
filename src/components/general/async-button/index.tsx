import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

export function AsyncButton(props: any & {asyncRequest: Promise<null>}){
	const [isLoading, setIsLoading] = React.useState(false);
	const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');

	async function onClick(){
		try{
			setIsLoading(true);
			await props.asyncRequest();
			setIsLoading(false);
		} catch(err: any) {
			setIsLoading(false);
			setSnackbarMessage(err.toString());
			setIsSnackbarOpen(true);
			console.log(err);
		}
	}

	function handleClose(){
		setIsSnackbarOpen(false);
	}

	return <>
		<LoadingButton loading={isLoading} {...props} onClick={onClick}>
			{props.children}
		</LoadingButton>
		
		<Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{snackbarMessage}
				</Alert>
		</Snackbar>
	</>
}