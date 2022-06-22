import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { Alert, Snackbar } from '@mui/material';
import { string } from 'prop-types';
import { useState } from 'react';

type AsyncButtonProps = {
  asyncRequest: () => Promise<void>;
};

export function AsyncButton(props: LoadingButtonProps & AsyncButtonProps) {
  const { asyncRequest, ...loadingButtonProps } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  function getErrorString(err: any): string {
    if (err instanceof string) return err as string;
    if (
      err.status !== undefined &&
      err.data.errors.length > 0 &&
      err.data.errors[0].message
    )
      return err.data.errors[0].message;
    return 'Error';
  }

  async function onClick() {
    try {
      setIsLoading(true);
      await asyncRequest();
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setSnackbarMessage(getErrorString(err));
      setIsSnackbarOpen(true);
    }
  }

  function handleClose() {
    setIsSnackbarOpen(false);
  }

  return (
    <>
      <LoadingButton
        loading={isLoading}
        onClick={onClick}
        {...loadingButtonProps}
      >
        {props.children}
      </LoadingButton>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
