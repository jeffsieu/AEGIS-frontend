// import logo from './logo.svg';
import PlannerNavBar from '@components/layout/navigation/PlannerNavBar/PlannerNavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/planner" element={<PlannerNavBar/>}></Route>
			</Routes>
		</BrowserRouter>
  );
}

export default App;
