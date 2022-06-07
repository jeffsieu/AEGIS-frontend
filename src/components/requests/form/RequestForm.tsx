import { Box, Button, Grid } from '@mui/material';
import { RequestPeriod } from '@typing';
import { useState } from 'react';
import RequestFormItem from './RequestFormItem';

export type RequestFormProps = {};

function RequestForm(props: RequestFormProps) {
  const [requests, setRequests] = useState<RequestPeriod[]>([
    {
      startDate: null,
      endDate: null,
      reason: '',
    },
  ]);

  function onInputFocus(index: number) {
    if (index === requests.length - 1) {
      setRequests([
        ...requests,
        { startDate: null, endDate: null, reason: '' },
      ]);
    }
  }

  function onDelete(index: number) {
    setRequests([...requests.filter((_, i) => i !== index)]);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
      <Grid container spacing={2}>
        {requests.map((request, index) => (
          <Grid item xs={12} md={6}>
            <RequestFormItem
              key={index}
              onUpdate={() => {
                setRequests([...requests]);
              }}
              onInputFocus={() => {
                onInputFocus(index);
              }}
              onDelete={() => {
                onDelete(index);
              }}
              index={index}
              isPromptItem={index === requests.length - 1}
              request={request}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained">Submit</Button>
    </Box>
  );
}

export default RequestForm;
