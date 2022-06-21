import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  callsign: string;
};

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    userId: 1,
    callsign: '',
  },
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userId = action.payload.id;
      state.callsign = action.payload.callsign;
    },
  },
});

export const { setUser } = generalSlice.actions;
export default generalSlice.reducer;
