import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hasPlannerCookie, setPlannerCookie } from './cookies';

type User = {
  id: number;
  callsign: string;
};

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    userId: 1,
    callsign: '',
    isPlanner: hasPlannerCookie(),
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.id;
      state.callsign = action.payload.callsign;
    },
    setIsPlanner: (state, action: PayloadAction<{ isPlanner: boolean }>) => {
      setPlannerCookie(action.payload.isPlanner);
      state.isPlanner = action.payload.isPlanner;
    },
  },
});

export const { setUser, setIsPlanner } = generalSlice.actions;
export default generalSlice.reducer;
