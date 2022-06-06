import { configureStore } from '@reduxjs/toolkit';
import draftReducer from '@store/schedule/draft';
import generalReducer from '@store/schedule/general';
import publishedReducer from '@store/schedule/published';
import membersReducer from '@store/users';

const store = configureStore({
  reducer: {
    draft: draftReducer,
    general: generalReducer,
    published: publishedReducer,
    members: membersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
