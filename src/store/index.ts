import { configureStore } from '@reduxjs/toolkit';
import { backendApi } from '@services/backend';
import draftReducer from '@store/schedule/draft';
import generalReducer from '@store/schedule/general';
import publishedReducer from '@store/schedule/published';
import membersReducer from '@store/users';

const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    draft: draftReducer,
    general: generalReducer,
    published: publishedReducer,
    members: membersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Workaround for Date being in draft slice
    }).concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
