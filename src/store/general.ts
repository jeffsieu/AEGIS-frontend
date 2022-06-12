import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    userId: 1,
  },
  reducers: {
    setUserId: (state, action: PayloadAction<number>) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = generalSlice.actions;
export default generalSlice.reducer;
