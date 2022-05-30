import { useMatch } from 'react-router-dom';
import MemberNavBar from './MemberNavBar/MemberNavBar';
import PlannerNavBar from './PlannerNavBar/PlannerNavBar';

function NavBar() {
  const isPlannerPath = useMatch('/planner/*');

  if (isPlannerPath) {
    return <PlannerNavBar />;
  } else {
    return <MemberNavBar />;
  }
}

export default NavBar;
