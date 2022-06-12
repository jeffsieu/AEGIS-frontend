import { Box, Button, Grid } from '@mui/material';
import { RequestPeriod } from '@typing';
import { useMemo, useRef, useState } from 'react';
import RequestFormItem, { PartialRequestPeriod } from './RequestFormItem';

export type RequestFormProps = {
  onRequestCreate: (requestPeriods: RequestPeriod[]) => void;
};

function RequestForm(props: RequestFormProps) {
  const { onRequestCreate } = props;
  const form = useRef<HTMLFormElement>();
  const [periods, setPeriods] = useState<PartialRequestPeriod[]>([
    {
      startDate: null,
      endDate: null,
      reason: '',
    },
    {
      startDate: null,
      endDate: null,
      reason: '',
    },
  ]);

  const filledPeriods = useMemo(
    () => periods.slice(0, periods.length - 1) as RequestPeriod[],
    [periods]
  );

  function onInputFocus(index: number) {
    if (index === periods.length - 1) {
      setPeriods([...periods, { startDate: null, endDate: null, reason: '' }]);
    }
  }

  function onDelete(index: number) {
    setPeriods([...periods.filter((_, i) => i !== index)]);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      gap={2}
      component="form"
      ref={form}
    >
      <Grid container spacing={2}>
        {periods.map((period, index) => (
          <Grid key={index} item xs={12} md={6}>
            <RequestFormItem
              onUpdate={() => {
                setPeriods([...periods]);
              }}
              onInputFocus={() => {
                onInputFocus(index);
              }}
              onDelete={() => {
                onDelete(index);
              }}
              canDelete={filledPeriods.length > 1 && index < periods.length - 1}
              index={index}
              isPromptItem={index === periods.length - 1}
              requestPeriod={period}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => {
          if (form.current?.reportValidity()) {
            onRequestCreate(filledPeriods);
          }
        }}
      >
        Create
      </Button>
    </Box>
  );
}

export default RequestForm;
