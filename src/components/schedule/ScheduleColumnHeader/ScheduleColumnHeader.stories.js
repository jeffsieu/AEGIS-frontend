import ScheduleColumnHeader from './ScheduleColumnHeader';
import { lightTheme } from 'hummingbird-ui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default {
  title: 'Schedule/Schedule Column Header',
  component: ScheduleColumnHeader,
  argTypes: {
    date: {
      control: 'date',
      type: {
        required: true,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

const Template = ({ date, ...restArgs }) => (
  <ScheduleColumnHeader date={new Date(date)} {...restArgs} />
);

export const Default = Template.bind({});
Default.args = {
  date: new Date('2020-01-01'),
};
