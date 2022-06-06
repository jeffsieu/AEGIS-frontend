// import logo from './logo.svg';
import NavBar from '@components/layout/navigation/NavBar';
import PlannerHomePage from '@views/Planner/PlannerHomePage/PlannerHomePage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { lightTheme } from 'hummingbird-ui';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PlannerNewPlanForm from '@views/Planner/PlannerNewPlanForm/PlannerNewPlanForm';
import { Provider } from 'react-redux';
import store from '@store';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PlannerMembersPage from '@views/Planner/PlannerMembersPage/PlannerMembersPage';
import PlannerPublishedPage from '@views/Planner/PlannerPublishedPage/PlannerPublishedPage';
import MemberHomePage from '@views/Member/MemberHomePage/MemberHomePage';
import PlannerDraftsPage from '@views/Planner/PlannerDraftsPage/PlannerDraftsPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      {/* Transparent toolbar to fix navbar overlap */}
      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={400}
          mountOnEnter={false}
          unmountOnExit={true}
        >
          <Container className="container">
            <Box pt={4}>
              <Routes location={location}>
                <Route path="/" element={<MemberHomePage />}></Route>
                <Route path="/planner" element={<PlannerHomePage />}></Route>
                <Route
                  path="/planner/new-plan"
                  element={<PlannerNewPlanForm />}
                ></Route>
                <Route
                  path="/planner/published"
                  element={<PlannerPublishedPage />}
                ></Route>
                <Route
                  path="/planner/drafts"
                  element={<PlannerDraftsPage />}
                ></Route>
                <Route
                  path="/planner/members"
                  element={<PlannerMembersPage />}
                ></Route>
              </Routes>
            </Box>
          </Container>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

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
            <AnimatedRoutes />
          </BrowserRouter>
        </LocalizationProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
