import { WarningRounded } from "@mui/icons-material";
import { Chip } from "@mui/material";

export function WarningChip(props: {label:string}){
	return <Chip icon={<WarningRounded/>} {...props}/>
}