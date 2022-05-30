import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store';
import dayjs from 'dayjs';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    roles: [],
    monthsToPlan: Array.from({ length: 12 }, (_, i) =>
      dayjs().startOf('month').add(i, 'month').toDate()
    ),
    nextMonthToPlan: new Date(),
  },
  reducers: {},
});

export const getRoles = (state: RootState) => state.general.roles;
export const getNextMonthToPlan = (state: RootState) =>
  state.general.nextMonthToPlan;
export const getMonthsToPlan = (state: RootState) => state.general.monthsToPlan;

export default generalSlice.reducer;
