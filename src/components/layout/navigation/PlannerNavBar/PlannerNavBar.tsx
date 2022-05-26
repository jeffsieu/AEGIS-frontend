import { MenuRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem, useMediaQuery } from '@mui/material'
import React from 'react';
import './style.css'

function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuRounded/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>HOME</MenuItem>
        <MenuItem onClick={handleClose}>PUBLISHED</MenuItem>
        <MenuItem onClick={handleClose}>MEMBERS</MenuItem>
        <MenuItem onClick={handleClose}>REQUESTS</MenuItem>
      </Menu>
    </>
  );
}

export default function PlannerNavBar(){
  
  const isMobile = !useMediaQuery('(min-width:800px)');

  return (
    <nav className="nav-bar">
      <div className="left"><Button variant="outlined">Back</Button><b className="title">AEGIS | PLANNER</b></div>
      {isMobile ? null : <div className="middle">
        <Button>HOME</Button>
        <Button>PUBLISHED</Button>
        <Button>MEMBERS</Button>
        <Button>REQUESTS</Button>
      </div>}
      <div className="right">{isMobile ? <DropdownMenu/> : null}<Button variant="outlined">New Plan</Button></div>
    </nav>
  );
}