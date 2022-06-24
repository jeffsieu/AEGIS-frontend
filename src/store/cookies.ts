import Cookies from "universal-cookie";

export const cookies = new Cookies();

export const hasPlannerCookie = () : boolean => {
	const cookie = cookies.get('isPlanner');
	return cookie ? cookie : false;
}

export const setPlannerCookie = (isPlanner: boolean) => {
	if(isPlanner == false){
		cookies.remove('isPlanner');
		return;
	}
	cookies.set('isPlanner', isPlanner);
}