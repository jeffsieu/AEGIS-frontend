import { useState } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

type Props = {
    openDialog: boolean;
    handleClose: () => void;
    handleCreateRequest: () => void;
}

export default function CreateRequestDialog({
    openDialog,
    handleClose,
    handleCreateRequest
}: Props) {
  const [checkedClass, setCheckedClass] = useState(false)
  const [checkedPDPA, setCheckedPDPA] = useState(false)

  const handleCheckClass = () => {
    setCheckedClass(!checkedClass);
  };

  const handleCheckPDPA = () => {
    setCheckedPDPA(!checkedPDPA);
  };

  return (
    <Dialog 
        open={openDialog} 
        onClose={handleClose} 
        aria-labelledby="create-request-dialog"
    >
      <DialogTitle id="create-request-dialog">
        Acknowledgment of Data Classification and Personal Data
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack direction="column" spacing={2}>
            <Typography color="primary" variant="h6">
              By checking the boxes below, you acknowledge that all entered data:
            </Typography>

            <Stack direction="column">
              <Stack direction="row">
                  <FormControlLabel
                  label=""
                  control={
                    <Checkbox
                      value=""
                      checked={checkedClass}
                      onChange={handleCheckClass}
                      color="primary"
                    />
                  }
                  />
                  <Box>
                    are classified OFFICIAL(OPEN)
                  </Box>
              </Stack>

              <Stack direction="row">
                <FormControlLabel
                label=""
                control={
                  <Checkbox
                    value=""
                    checked={checkedPDPA}
                    onChange={handleCheckPDPA}
                    color="primary"
                  />
                }
                />
                <Box>
                  do not contain personal information that 
                  might be regulated under the Personal Data 
                  Protection Act (PDPA)
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreateRequest}
          color="primary"
          disabled={ checkedClass && checkedPDPA ? false : true}
        >
          Create Request
        </Button>
        <Button
          onClick={handleClose}
          color="error"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}