export const hasPlannerCookie = (): boolean => {
  const isPlannerEntry = sessionStorage.getItem('isPlanner');
  return isPlannerEntry === 'true';
};

export const setPlannerCookie = (isPlanner: boolean) => {
  if (isPlanner) {
    sessionStorage.setItem('isPlanner', 'true');
  } else {
    sessionStorage.removeItem('isPlanner');
  }
};
