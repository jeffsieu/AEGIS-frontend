import MultiDatePicker from '.';
import { ComponentStory } from '@storybook/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default {
  title: 'General/Multi Date Picker',
  component: MultiDatePicker,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
  decorators: [
    (Story: any) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Story />
      </LocalizationProvider>
    ),
  ],
};

const Template: ComponentStory<typeof MultiDatePicker> = (args) => (
  <MultiDatePicker {...args}></MultiDatePicker>
);

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'Dates',
  minDate: dayjs('2022-05-01'),
  maxDate: dayjs('2022-05-31'),
  views: ['day'],
  selection: [dayjs('2022-05-01'), dayjs('2022-05-02')],
};

export const Filled = Template.bind({});
Filled.args = {
  label: 'Dates',
  minDate: dayjs('2022-05-01'),
  maxDate: dayjs('2022-05-31'),
  views: ['day'],
  selection: [dayjs('2022-05-01'), dayjs('2022-05-02')],
  textFieldProps: {
    variant: 'filled',
  },
};
