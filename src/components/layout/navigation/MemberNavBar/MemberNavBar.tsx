import NavigationBar from '@components/general/navigation-bar';
import { useNavigate } from 'react-router-dom';

function MemberNavBar() {
  const navigate = useNavigate();
  return (
    <NavigationBar
      title={'AEGIS'}
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
      ]}
      actions={[
        {
          label: 'New request',
          onClick: () => {
            navigate('/new-request');
          },
        },
      ]}
    ></NavigationBar>
  );
}

export default MemberNavBar;
