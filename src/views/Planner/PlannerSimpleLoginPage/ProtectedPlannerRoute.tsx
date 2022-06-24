import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

type PlannerRouteProps = {
	children: JSX.Element;
}

export default function ProtectedPlannerRoute({children}: PlannerRouteProps) {
	const isPlanner = useAppSelector((state) => state.general.isPlanner);

	console.log(isPlanner);

	if(!isPlanner){
		return <Navigate to="/login" replace />;
	}

	return children;
}