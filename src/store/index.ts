import { configureStore } from '@reduxjs/toolkit';
import { backendApi } from '@services/backend';
import generalReducer from '@store/general';

const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    general: generalReducer,
    // published: publishedReducer,
    // members: membersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Workaround for Date being in draft slice
    }).concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
