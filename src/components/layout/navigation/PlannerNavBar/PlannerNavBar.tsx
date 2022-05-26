import { Button } from '@mui/material'
import './style.css'

export default function PlannerNavBar(){
  return (
    <nav className="nav-bar">
      <div className="left"><Button variant="outlined">Back</Button><b className="title">AEGIS | PLANNER</b></div>
      <div className="middle">
        <Button>home</Button>
        <Button>published</Button>
        <Button>members</Button>
        <Button>requests</Button>
      </div>
      <div className="right"><Button variant="outlined">New Plan</Button></div>
    </nav>
  )
}