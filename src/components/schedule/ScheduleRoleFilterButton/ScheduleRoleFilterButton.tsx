import {
  CheckBox,
  CheckBoxOutlineBlank,
  FilterAltOutlined,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Role } from '@typing';
import { useState } from 'react';

export type ScheduleRowFilterButtonProps = {
  roles: Role[];
  selectedRoles: Role[];
  onSelectedRolesChange: (roles: Role[]) => void;
};

function ScheduleRowFilterButton(props: ScheduleRowFilterButtonProps) {
  const { roles, selectedRoles, onSelectedRolesChange } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterAltOutlined />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <li>
          <Typography
            sx={{ mt: 0.5, ml: 2 }}
            color="text.secondary"
            display="block"
            variant="caption"
          >
            Show roles
          </Typography>
        </li>
        {roles.map((role, index) => {
          return (
            <MenuItem
              key={index}
              selected={selectedRoles.includes(role)}
              disabled={
                selectedRoles.includes(role) && selectedRoles.length === 1
              }
              onClick={() => {
                if (selectedRoles.includes(role)) {
                  onSelectedRolesChange(
                    selectedRoles.filter((r) => r !== role)
                  );
                } else {
                  onSelectedRolesChange([...selectedRoles, role]);
                }
              }}
            >
              <ListItemIcon>
                {selectedRoles.includes(role) ? (
                  <CheckBox color="primary" />
                ) : (
                  <CheckBoxOutlineBlank color="primary" />
                )}
              </ListItemIcon>
              {role.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default ScheduleRowFilterButton;
