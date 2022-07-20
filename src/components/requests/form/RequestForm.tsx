import { Box, Button, Grid } from '@mui/material';
import { RequestPeriod } from '@typing';
import { Backend } from '@typing/backend';
import { useMemo, useRef, useState } from 'react';
import RequestFormItem, { PartialRequestPeriod } from './RequestFormItem';
import CreateRequestDialog from './CreateRequestDialog'

export type RequestFormProps = {
  members: Backend.Entry<Backend.Member>[];
  onRequestCreate: (requestPeriods: RequestPeriod[]) => void;
};

function RequestForm(props: RequestFormProps) {
  const { members, onRequestCreate } = props;
  const form = useRef<HTMLFormElement>();
  const [periods, setPeriods] = useState<PartialRequestPeriod[]>([
    {
      dates: [],
      member: null,
      reason: '',
      type: null,
    },
    {
      dates: [],
      member: null,
      reason: '',
      type: null,
    },
  ]);

  const filledPeriods = useMemo(
    () => periods.slice(0, periods.length - 1) as RequestPeriod[],
    [periods]
  );

  function onInputFocus(index: number) {
    if (index === periods.length - 1) {
      setPeriods([
        ...periods,
        {
          dates: [],
          member: null,
          reason: '',
          type: null,
        },
      ]);
    }
  }

  function onDelete(index: number) {
    setPeriods([...periods.filter((_, i) => i !== index)]);
  }

  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

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
              members={members}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={handleClickOpen}
      >
        Create request
      </Button>
      <CreateRequestDialog 
        openDialog={openDialog}
        handleClose={handleClose}
        handleCreateRequest={() => {
          if (form.current?.reportValidity()) {
            onRequestCreate(filledPeriods);
          }
        }}
      />
    </Box>
  );
}

export default RequestForm;
