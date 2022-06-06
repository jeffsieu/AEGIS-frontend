import { MemberEntry } from '@components/members/MemberTable/MemberTable';
import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [] as MemberEntry[],
  },
  reducers: {},
});

export default membersSlice.reducer;
