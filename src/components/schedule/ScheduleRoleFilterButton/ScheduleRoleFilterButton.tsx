import {
  CheckBox,
  CheckBoxOutlineBlank,
  FilterList,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Backend } from '@typing/backend';
import { useState } from 'react';

export type ScheduleRowFilterButtonProps = {
  roleInstances: Backend.RoleInstance[];
  selectedRoleInstances: Backend.RoleInstance[];
  onSelectedRoleInstancesChange: (
    roleInstances: Backend.RoleInstance[]
  ) => void;
};

function ScheduleRowFilterButton(props: ScheduleRowFilterButtonProps) {
  const {
    roleInstances,
    selectedRoleInstances,
    onSelectedRoleInstancesChange,
  } = props;
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
        <FilterList />
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
        {roleInstances.map((roleInstance, index) => {
          return (
            <MenuItem
              key={index}
              selected={selectedRoleInstances.includes(roleInstance)}
              disabled={
                selectedRoleInstances.includes(roleInstance) &&
                selectedRoleInstances.length === 1
              }
              onClick={() => {
                if (selectedRoleInstances.includes(roleInstance)) {
                  onSelectedRoleInstancesChange(
                    selectedRoleInstances.filter((r) => r !== roleInstance)
                  );
                } else {
                  onSelectedRoleInstancesChange([
                    ...selectedRoleInstances,
                    roleInstance,
                  ]);
                }
              }}
            >
              <ListItemIcon>
                {selectedRoleInstances.includes(roleInstance) ? (
                  <CheckBox color="primary" />
                ) : (
                  <CheckBoxOutlineBlank color="primary" />
                )}
              </ListItemIcon>
              {roleInstance.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default ScheduleRowFilterButton;
