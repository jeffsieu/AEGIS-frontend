import { useNavigate } from 'react-router-dom';
import NavigationBar from '@components/general/navigation-bar';

function PlannerNavBar() {
  const navigate = useNavigate();
  return (
    <NavigationBar
      title={'AEGIS | Planner'}
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
      ]}
      actions={[
        {
          label: 'New plan',
          onClick: () => {
            navigate('/planner/new-plan');
          },
        },
      ]}
    ></NavigationBar>
  );
}

export default PlannerNavBar;
