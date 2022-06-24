import Cookies from 'universal-cookie';

export const cookies = new Cookies();

export const hasPlannerCookie = (): boolean => {
  const cookie = cookies.get('isPlanner');
  return cookie === 'true';
};

export const setPlannerCookie = (isPlanner: boolean) => {
  if (isPlanner) {
    cookies.set('isPlanner', isPlanner, {
      path: '/',
    });
  } else {
    cookies.remove('isPlanner');
  }
};
