import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
import { Schedule } from "@typing";

export type PublishedState = {
    schedules: Schedule[];
}

export const getPublishedSchedules = (state: RootState): Schedule[] => {
    return state.published.schedules;
}

export const publishedSlice = createSlice({
    name: 'published',
    initialState: {
        schedules: [],
    } as PublishedState,
    reducers: {
    }
});

export default publishedSlice.reducer;