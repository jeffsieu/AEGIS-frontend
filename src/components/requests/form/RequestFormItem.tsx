import MultiDatePicker from '@components/general/multi-date-picker';
import {
  Add,
  Announcement,
  Clear,
  DateRangeOutlined,
  Person,
  Work,
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Divider,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Backend } from '@typing/backend';
import { getCardColor } from '@utils/theme';
import { Dayjs } from 'dayjs';

export type PartialRequestPeriod = {
  dates: Dayjs[];
  member: Backend.Entry<Backend.Member> | null;
  reason: string;
  type: Backend.RequestType | null;
};

export type RequestFormItemProps = {
  index: number;
  isPromptItem: boolean;
  requestPeriod: PartialRequestPeriod;
  members: Backend.Entry<Backend.Member>[];
  canDelete: boolean;
  onUpdate: () => void;
  onDelete: () => void;
  onInputFocus: () => void;
};

function RequestFormItem(props: RequestFormItemProps) {
  const {
    requestPeriod: request,
    members,
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
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <MultiDatePicker
                label="Date/s"
                inputFormat="DD/MM/YYYY"
                onOpen={() => {
                  onInputFocus();
                }}
                onSelectionChanged={(dates) => {
                  request.dates = dates;
                  onUpdate();
                }}
                textFieldProps={{
                  variant: 'filled',
                  fullWidth: true,
                  required: !isPromptItem,
                  autoComplete: 'off',
                  onFocus: () => {
                    onInputFocus();
                  },
                }}
                selection={request.dates}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                autoHighlight
                options={members}
                getOptionLabel={(option) => option.callsign}
                onChange={(event, value) => {
                  request.member = value;
                  onUpdate();
                }}
                onFocus={() => {
                  onInputFocus();
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Callsign"
                    fullWidth
                    variant="filled"
                    required={!isPromptItem}
                  />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props}>{option.callsign}</MenuItem>
                )}
                value={request.member}
                isOptionEqualToValue={(option, value) => {
                  return option.callsign === value.callsign;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" required={!isPromptItem}>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  required={!isPromptItem}
                  value={request.type}
                  onChange={(event) => {
                    request.type = event.target.value as Backend.RequestType;
                    onUpdate();
                  }}
                  onFocus={() => {
                    onInputFocus();
                  }}
                >
                  <MenuItem value="Work">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Work
                        fontSize="small"
                        htmlColor={theme.palette.text.secondary}
                      />
                      Work
                    </Box>
                  </MenuItem>
                  <MenuItem value="Personal">
                    <Box display="flex" alignItems="center" gap={2}>
                      <Person
                        fontSize="small"
                        htmlColor={theme.palette.text.secondary}
                      />
                      Personal
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled" required={!isPromptItem}>
                  <InputLabel>Reason</InputLabel>
                  <FilledInput
                    value={request.reason}
                    onFocus={() => {
                      onInputFocus();
                    }}
                    onChange={(e) => {
                      request.reason = e.target.value;
                      onUpdate();
                    }} />
                    <FormHelperText
                    sx={{ 
                      color: theme.palette.primary.main, 
                      fontSize: 14, 
                      fontWeight: 'bold'  
                      }}>
                      <Announcement 
                      fontSize="small" 
                      sx={{ verticalAlign: 'middle',
                            display: 'inline-flex'}}/>
                      Please ensure your reason is classified under OFFICIAL(OPEN)!
                    </FormHelperText>
                </FormControl>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RequestFormItem;
