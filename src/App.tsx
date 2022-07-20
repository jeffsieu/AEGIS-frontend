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
import PlannerMembersPage from '@views/Planner/PlannerMembersPage/PlannerMembersPage';
import PlannerRolesPage from '@views/Planner/PlannerRolesPage/PlannerRolesPage';
import PlannerSchedulesPage from '@views/Planner/PlannerSchedulesPage/PlannerSchedulesPage';
import PlannerPublishedSchedulePage from '@views/Planner/PlannerSchedulePage/PlannerPublishedSchedulePage';
import MemberHomePage from '@views/Member/MemberHomePage/MemberHomePage';
import PlannerDraftsPage from '@views/Planner/PlannerDraftsPage/PlannerDraftsPage';
import MemberNewRequestForm from '@views/Member/MemberNewRequestForm/MemberNewRequestForm';
import dayjs from 'dayjs';
import 'dayjs/locale/en-sg';
import MemberSchedulePage from '@views/Member/MemberSchedulePage/MemberSchedulePage';
import MemberRequestPage from '@views/Member/MemberRequestsPage/MemberRequestsPage';
import MemberSchedulesPage from '@views/Member/MemberSchedulesPage/MemberSchedulesPage';
import PlannerDraftEditorPage from '@views/Planner/PlannerDraftEditorPage/PlannerDraftEditorPage';
import InitializeDataButton from '@utils/mock-data/InitializeDataButton';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetMembersQuery } from '@services/backend';
import { setUser } from '@store/general';
import PlannerSchedulePage from '@views/Planner/PlannerSchedulePage/PlannerSchedulePage';
import { useEffect } from 'react';
import FadeTransition from '@components/general/fade-transition';
import PlannerSimpleLoginPage from '@views/Planner/PlannerSimpleLoginPage/PlannerSimpleLoginPage';
import ProtectedPlannerRoute from '@views/Planner/PlannerSimpleLoginPage/ProtectedPlannerRoute';

function AnimatedRoutes() {
  const location = useLocation();
  const userId = useAppSelector((state) => state.general.userId);
  const { data: members } = useGetMembersQuery();
  const dispatch = useAppDispatch();

  const handleUserChange = (event: SelectChangeEvent) => {
    dispatch(
      setUser({
        id: +event.target.value,
        callsign:
          members?.find((member) => member.id === +event.target.value)
            ?.callsign ?? '',
      })
    );
  };

  useEffect(() => {
    if (userId) {
      dispatch(
        setUser({
          id: userId,
          callsign:
            members?.find((member) => member.id === userId)?.callsign ?? '',
        })
      );
    }
  }, [userId, members, dispatch]);

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
      <Container disableGutters>
        <FadeTransition transitionKey={location.pathname + location.state}>
          <Box paddingY={4}>
            <Container>
              <Routes location={location}>
                <Route path="/" element={<MemberHomePage />} />
                <Route path="/new-request" element={<MemberNewRequestForm />} />
                <Route path="/schedules" element={<MemberSchedulesPage />} />
                <Route
                  path="/schedules/:month"
                  element={<MemberSchedulePage />}
                />
                <Route path="/requests" element={<MemberRequestPage />} />
                <Route path="/planner" element={<ProtectedPlannerRoute />}>
                  <Route index element={<PlannerHomePage />} />
                  <Route path="new-plan" element={<PlannerNewPlanForm />} />
                  <Route path="published" element={<PlannerSchedulesPage />} />
                  <Route path="drafts" element={<PlannerDraftsPage />} />
                  <Route
                    path="schedules/:month/view"
                    element={<PlannerPublishedSchedulePage />}
                  />
                  <Route
                    path="schedules/:month/edit"
                    element={<PlannerDraftEditorPage />}
                  />
                  <Route
                    path="schedules/:month"
                    element={<PlannerSchedulePage />}
                  />
                  <Route path="members" element={<PlannerMembersPage />} />
                  <Route path="requests" element={<MemberRequestPage />} />
                  <Route path="roles" element={<PlannerRolesPage />} />
                </Route>
                <Route path="/login" element={<PlannerSimpleLoginPage />} />
              </Routes>
            </Container>
          </Box>
        </FadeTransition>
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
