import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

type AsyncButtonProps = {
	asyncRequest: () => void;
}

export function AsyncButton(props: LoadingButtonProps & AsyncButtonProps){
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