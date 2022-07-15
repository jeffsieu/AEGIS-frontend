import { render, renderHook, RenderOptions } from '@testing-library/react';
import { PreloadedState, Store } from 'redux';

import newStore, { RootState } from '@store';
import generalReducer from '@store/general';
import { configureStore } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { backendApi } from '@services/backend';
import { BrowserRouter, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from 'hummingbird-ui';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: any; //TODO: get the actual store type instead of using any
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = newStore.getState(),
    store = configureStore({
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
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    const theme = lightTheme;

    theme.typography.button.textTransform = 'none';
    theme.typography.button.fontWeight = 'bold';

    dayjs.locale('en-sg');

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>{children}</BrowserRouter>
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    result: { ...render(ui, { wrapper: Wrapper, ...renderOptions }) },
  };
}
