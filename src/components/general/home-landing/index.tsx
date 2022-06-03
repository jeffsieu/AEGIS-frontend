import { Button, Grid } from "@mui/material";
import "./style.css"

export default function HomeLanding(){
	return <Grid
		className="landing-container"
		container
		spacing={0}
		direction="column"
		alignItems="center"
		justifyContent="center"
	>
  <Grid item xs={3}>
			<h1>AEGIS</h1>
			<p>ASW Enhanced Generative Integrated Scheduler</p>
			<div><Button variant="contained" sx={{marginRight: 1}}>Get Started</Button><Button>Learn More</Button></div>
		</Grid>
	</Grid>
}