import { configureStore } from '@reduxjs/toolkit';
import draftReducer from '@store/schedule/draft';
import generalReducer from '@store/schedule/general';

const store = configureStore({
  reducer: {
    draft: draftReducer,
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
