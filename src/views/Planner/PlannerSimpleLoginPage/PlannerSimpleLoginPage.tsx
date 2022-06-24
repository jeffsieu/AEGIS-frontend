import TitledContainer from "@components/general/titled-container";
import { Button, Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { setIsPlanner } from "@store/general";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

const PLANNER_PASSWORD = "pw123";

export default function PlannerSimpleLoginPage(){

	const [passwordInput, setPasswordInput] = React.useState<string>("");
	const [error, setError] = React.useState<string>("");
	const dispatch = useAppDispatch();
	const isPlanner = useAppSelector((state) => state.general.isPlanner);
	const navigate = useNavigate();

	function onChangePassword(event:any){
		setPasswordInput(event.target.value);
	}

	async function onSubmit(event:any){
		event.preventDefault();
		try {
			await validatePassword(passwordInput);
			dispatch(setIsPlanner({isPlanner: true}));
		} catch (error: any) {
			setError(error.toString());
		}
	}

	function validatePassword(password: string): Promise<void> {
		return new Promise<void>((res, rej) => {
			if(password == PLANNER_PASSWORD) res();
			else rej("Incorrect password");
		})
	}

	React.useEffect(() => {
		if(isPlanner) {
			navigate('/planner');
		}
	}, [isPlanner, dispatch])

	return (
		<TitledContainer title="Login as planner">
			<Box component='form' noValidate onSubmit={onSubmit}>
				<TextField
						error={error != ""}
						required
						id="outlined-required"
						label="Password"
						type='password'
						onChange={onChangePassword}
						helperText={error}
					/>
				<br/>
				<br/>
				<Button type='submit'>Submit</Button>
			</Box>
		</TitledContainer>
	);
}