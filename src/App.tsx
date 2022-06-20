// import logo from './logo.svg';
import NavBar from '@components/layout/navigation/NavBar';
import PlannerHomePage from '@views/Planner/PlannerHomePage/PlannerHomePage';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { lightTheme } from 'hummingbird-ui';
import {
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PlannerNewPlanForm from '@views/Planner/PlannerNewPlanForm/PlannerNewPlanForm';
import { Provider } from 'react-redux';
import store from '@store';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PlannerMembersPage from '@views/Planner/PlannerMembersPage/PlannerMembersPage';
import PlannerSchedulesPage from '@views/Planner/PlannerSchedulesPage/PlannerSchedulesPage';
import PlannerPublishedSchedulePage from '@views/Planner/PlannerSchedulePage/PlannerPublishedSchedulePage';
import MemberHomePage from '@views/Member/MemberHomePage/MemberHomePage';
import PlannerDraftsPage from '@views/Planner/PlannerDraftsPage/PlannerDraftsPage';
import MemberNewRequestForm from '@views/Member/MemberNewRequestForm/MemberNewRequestForm';
import dayjs from 'dayjs';
import 'dayjs/locale/en-sg';
import MemberRequestPage from '@views/Member/MemberRequestsPage/MemberRequestsPage';
import MemberPublishedPage from '@views/Member/MemberPublishedPage/MemberPublishedPage';
import PlannerDraftEditorPage from '@views/Planner/PlannerDraftEditorPage/PlannerDraftEditorPage';
import InitializeDataButton from '@utils/mock-data/InitializeDataButton';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetMembersQuery } from '@services/backend';
import { setUserId } from '@store/general';
import PlannerSchedulePage from '@views/Planner/PlannerSchedulePage/PlannerSchedulePage';

function AnimatedRoutes() {
  const location = useLocation();
  const userId = useAppSelector((state) => state.general.userId);
  const { data: members } = useGetMembersQuery();
  const dispatch = useAppDispatch();

  const handleUserChange = (event: SelectChangeEvent) => {
    dispatch(setUserId(+event.target.value));
  };

  return (
    <>
      <NavBar />
      <Toolbar sx={{ background: 'lightgray' }} disableGutters>
        <Container>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography sx={{ fontWeight: 'bold' }}>Debug tools</Typography>
            <InitializeDataButton />
            {members !== undefined && (
              <FormControl>
                <InputLabel>Current user</InputLabel>
                <Select
                  value={userId + ''}
                  label="Current user"
                  onChange={handleUserChange}
                >
                  {members.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.callsign}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <span>User id: {userId}</span>
          </Box>
        </Container>
      </Toolbar>
      {/* Transparent toolbar to fix navbar overlap */}
      <Container className="container" sx={{ position: 'relative' }}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname + location.state}
            classNames="fade"
            timeout={{
              enter: 1000,
              exit: 200,
            }}
            mountOnEnter={false}
            unmountOnExit={true}
          >
            <Box pt={4} position="absolute" width="100%" left={0}>
              <Container>
                <Routes location={location}>
                  <Route path="/" element={<MemberHomePage />}></Route>
                  <Route
                    path="/new-request"
                    element={<MemberNewRequestForm />}
                  />
                  <Route path="/schedules" element={<MemberPublishedPage />} />
                  <Route
                    path="/schedules/:month"
                    element={<PlannerPublishedSchedulePage />}
                  />
                  <Route path="/requests" element={<MemberRequestPage />} />
                  <Route path="/planner" element={<PlannerHomePage />}></Route>
                  <Route
                    path="/planner/new-plan"
                    element={<PlannerNewPlanForm />}
                  />
                  <Route
                    path="/planner/published"
                    element={<PlannerSchedulesPage />}
                  />
                  <Route
                    path="/planner/drafts"
                    element={<PlannerDraftsPage />}
                  />
                  <Route
                    path="/planner/schedules/:month/view"
                    element={<PlannerPublishedSchedulePage />}
                  />
                  <Route
                    path="/planner/schedules/:month/edit"
                    element={<PlannerDraftEditorPage />}
                  />
                  <Route
                    path="/planner/schedules/:month"
                    element={<PlannerSchedulePage />}
                  />
                  <Route
                    path="/planner/members"
                    element={<PlannerMembersPage />}
                  />
                </Routes>
              </Container>
            </Box>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </>
  );
}

function App() {
  const theme = lightTheme;
  theme.typography.button.textTransform = 'none';
  theme.typography.button.fontWeight = 'bold';

  dayjs.locale('en-sg');

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
