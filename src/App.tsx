// import logo from './logo.svg';
import NavBar from '@components/layout/navigation/NavBar';
import PlannerHomePage from '@views/Planner/PlannerHomePage/PlannerHomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lightTheme } from 'hummingbird-ui';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PlannerNewPlanForm from '@views/Planner/PlannerNewPlanForm/PlannerNewPlanForm';
import { Provider } from 'react-redux';
import store from '@store';

function App() {
  const theme = lightTheme;
  theme.typography.button.textTransform = 'none';
  theme.typography.button.fontWeight = 'bold';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter>
            <NavBar />
            <Container>
              <Routes>
                <Route path="/" element={<PlannerHomePage />}></Route>
                <Route
                  path="/planner/new-plan"
                  element={<PlannerNewPlanForm />}
                ></Route>
              </Routes>
            </Container>
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
