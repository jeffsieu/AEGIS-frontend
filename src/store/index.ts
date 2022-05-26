import { configureStore } from '@reduxjs/toolkit';
import draftReducer from '@store/schedule';

const store = configureStore({
  reducer: {
    draft: draftReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
