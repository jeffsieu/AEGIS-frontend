// import logo from './logo.svg';
import PlannerNavBar from '@components/layout/navigation/PlannerNavBar/PlannerNavBar';
import PlannerHomePage from '@views/Planner/PlannerHomePage/PlannerHomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lightTheme } from 'hummingbird-ui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  const theme = lightTheme;
  theme.typography.button.textTransform = 'none';
  theme.typography.button.fontWeight = 'bold';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <PlannerNavBar />
          <Routes>
            <Route path="/" element={<PlannerHomePage />}></Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
