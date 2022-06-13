import { Add, DateRangeOutlined, Clear } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ERROR_END_DATE_BEFORE_START_DATE } from '@utils/constants/string';
import { getCardColor } from '@utils/theme';
import { Dayjs } from 'dayjs';

export type PartialRequestPeriod = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  reason: string;
};

export type RequestFormItemProps = {
  index: number;
  isPromptItem: boolean;
  requestPeriod: PartialRequestPeriod;
  canDelete: boolean;
  onUpdate: () => void;
  onDelete: () => void;
  onInputFocus: () => void;
};

function RequestFormItem(props: RequestFormItemProps) {
  const {
    requestPeriod: request,
    canDelete,
    index,
    isPromptItem,
    onUpdate,
    onInputFocus,
    onDelete,
  } = props;
  const theme = useTheme();
  const cardColor = getCardColor(theme);

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: !isPromptItem ? cardColor : undefined,
        transition: 'background-color 0.2s ease-in-out',
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Box p={1} display="flex" alignItems="center">
                {isPromptItem ? (
                  <Add htmlColor={theme.palette.text.secondary} />
                ) : (
                  <DateRangeOutlined />
                )}
              </Box>
              <Typography
                variant="h6"
                color={isPromptItem ? theme.palette.text.secondary : undefined}
              >
                {isPromptItem ? 'Add period...' : `Period ${index + 1}`}
              </Typography>
            </Box>
            {canDelete && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onDelete();
                }}
              >
                <Clear />
              </IconButton>
            )}
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start date"
                inputFormat="DD/MM/YYYY"
                onOpen={() => {
                  onInputFocus();
                }}
                onChange={(date) => {
                  request.startDate = date;
                  if (request.endDate === null) {
                    request.endDate = date;
                  }
                  onUpdate();
                }}
                value={request.startDate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onFocus={() => {
                      onInputFocus();
                    }}
                    variant="filled"
                    required={!isPromptItem}
                    fullWidth
                    autoComplete="off"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End date"
                inputFormat="DD/MM/YYYY"
                onOpen={() => {
                  onInputFocus();
                }}
                onChange={(date) => {
                  request.endDate = date;
                  onUpdate();
                }}
                value={request.endDate}
                renderInput={(params) => {
                  const hasError = request.endDate?.isBefore(request.startDate);
                  return (
                    <TextField
                      {...params}
                      onFocus={() => {
                        onInputFocus();
                      }}
                      error={hasError}
                      helperText={hasError && ERROR_END_DATE_BEFORE_START_DATE}
                      variant="filled"
                      required={!isPromptItem}
                      fullWidth
                      autoComplete="off"
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                variant="filled"
                required={!isPromptItem}
                value={request.reason}
                onFocus={() => {
                  onInputFocus();
                }}
                onChange={(e) => {
                  request.reason = e.target.value;
                  onUpdate();
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RequestFormItem;
