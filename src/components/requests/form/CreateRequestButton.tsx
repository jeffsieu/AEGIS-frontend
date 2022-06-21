import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useAddRequestsMutation } from '@services/backend';
import { useAppSelector } from '@store/hooks';
import { RequestPeriod } from '@typing';
import { useState } from 'react';
import RequestForm from './RequestForm';

function CreateRequestButton() {
  const theme = useTheme();
  const userId = useAppSelector((state) => state.general.userId);
  const [isCreating, setCreating] = useState(false);
  const [addRequests] = useAddRequestsMutation();

  const onRequestCreate = async (requestPeriods: RequestPeriod[]) => {
    await addRequests(
      requestPeriods.map(({ startDate, endDate, reason }) => ({
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        reason,
        memberId: userId,
      }))
    );
    setCreating(false);
  };

  if (isCreating) {
    return (
      <Stack spacing={4}>
        <Divider />
        <Typography variant="h5" color={theme.palette.text.secondary}>
          New request
        </Typography>
        <RequestForm onRequestCreate={onRequestCreate} />
        <Divider />
      </Stack>
    );
  } else {
    return (
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => {
          setCreating(true);
        }}
      >
        New request
      </Button>
    );
  }
}

export default CreateRequestButton;
