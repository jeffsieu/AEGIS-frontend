import NavigationBar from '@components/general/navigation-bar';
import { useNavigate } from 'react-router-dom';

function MemberNavBar() {
  const navigate = useNavigate();
  return (
    <NavigationBar
      title={{
        label: 'AEGIS',
        onClick: () => {
          navigate('/');
        },
      }}
      links={[
        {
          label: 'Home',
          onClick: () => {
            navigate('/');
          },
        },
        {
          label: 'Schedules',
          onClick: () => {
            navigate('/schedules');
          },
        },
        {
          label: 'Requests',
          onClick: () => {
            navigate('/requests');
          },
        },
        {
          label: 'Guide',
          onClick: () => {
            navigate('/guide');
          },
        },
      ]}
      actions={[
        {
          label: 'Switch to planner',
          onClick: () => {
            navigate('/planner');
          },
          ButtonProps: {
            variant: 'outlined',
          },
        },
        {
          label: 'New request',
          onClick: () => {
            navigate('/new-request');
          },
          ButtonProps: {
            variant: 'contained',
          },
        },
      ]}
    ></NavigationBar>
  );
}

export default MemberNavBar;
