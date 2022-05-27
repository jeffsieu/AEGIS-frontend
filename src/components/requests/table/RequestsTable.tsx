import { FilterAltOutlined } from '@mui/icons-material';
import {
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import { DateRange, displayDateRanges } from '@utils/helpers/dateRange';

export type Request = {
  callsign: string;
  dates: DateRange[];
  reason: string;
};

export type RequestsTableProps = {
  requests: Request[];
};

export default function RequestsTable(props: RequestsTableProps) {
  const { requests } = props;

  return (
    <TableContainer>
      <TableHead>
        <TableRow>
          <TableCell>
            <Grid container direction="row" alignItems="center">
              Callsign
              <FilterAltOutlined />
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container direction="row" alignItems="center">
              Date(s)
              <FilterAltOutlined />
            </Grid>
          </TableCell>
          <TableCell>Reason</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map((request) => (
          <TableRow>
            <TableCell>{request.callsign}</TableCell>
            <TableCell>{displayDateRanges(request.dates)}</TableCell>
            <TableCell>{request.reason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
