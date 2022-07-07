import { Box, Container } from '@mui/material';
import PlannerNavBar from '@components/layout/navigation/PlannerNavBar/PlannerNavBar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MemberNavBar from '@components/layout/navigation/MemberNavBar/MemberNavBar';
import { Provider } from 'react-redux';
import store from '@store';

export namespace Decorators {
  export const plannerContainerDecorator = (Story: any) => (
    <div>
      <PlannerNavBar />
      <Container>
        <Box pt={4} sx={{ position: 'relative' }}>
          <Story />
        </Box>
      </Container>
    </div>
  );

  export const memberContainerDecorator = (Story: any) => (
    <div>
      <MemberNavBar />
      <Container>
        <Box pt={4} sx={{ position: 'relative' }}>
          <Story />
        </Box>
      </Container>
    </div>
  );

  export const dateLocalizationProvider = (Story: any) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
  );
}
