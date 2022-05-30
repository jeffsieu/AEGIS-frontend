import NavigationBar from '@components/general/navigation-bar';

function PlannerNavBar() {
  return (
    <NavigationBar
      title={'AEGIS | Planner'}
      links={[
        {
          label: 'Home',
          onClick: () => {},
        },
        {
          label: 'Published',
          onClick: () => {},
        },
        {
          label: 'Drafts',
          onClick: () => {},
        },
        {
          label: 'Members',
          onClick: () => {},
        },
      ]}
      actions={[
        {
          label: 'New plan',
          onClick: () => {},
        },
      ]}
    ></NavigationBar>
  );
}

export default PlannerNavBar;
