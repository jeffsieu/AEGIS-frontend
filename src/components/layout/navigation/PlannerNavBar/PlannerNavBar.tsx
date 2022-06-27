import { useNavigate } from 'react-router-dom';
import NavigationBar from '@components/general/navigation-bar';
import { useAppDispatch } from '@store/hooks';
import { setIsPlanner } from '@store/general';

function PlannerNavBar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <NavigationBar
      title={{
        label: 'AEGIS | Planner',
        onClick: () => {
          navigate('/planner');
        },
      }}
      links={[
        {
          label: 'Home',
          onClick: () => {
            navigate('/planner');
          },
        },
        {
          label: 'Published',
          onClick: () => {
            navigate('/planner/published');
          },
        },
        {
          label: 'Drafts',
          onClick: () => {
            navigate('/planner/drafts');
          },
        },
        {
          label: 'Members',
          onClick: () => {
            navigate('/planner/members');
          },
        },
        {
          label: 'Requests',
          onClick: () => {
            navigate('/planner/requests');
          },
        },
        {
          label: 'Roles',
          onClick: () => {
            navigate('/planner/roles');
          },
        },
      ]}
      actions={[
        {
          label: 'Switch to member',
          onClick: () => {
            navigate('/');
          },
          ButtonProps: {
            variant: 'outlined',
          },
        },
        {
          label: 'Logout',
          onClick: () => {
            dispatch(setIsPlanner(false));
            navigate('/');
          },
          ButtonProps: {
            variant: 'outlined',
          },
        },
        {
          label: 'New draft',
          onClick: () => {
            navigate('/planner/new-plan');
          },
          ButtonProps: {
            variant: 'contained',
          },
        },
      ]}
    ></NavigationBar>
  );
}

export default PlannerNavBar;
