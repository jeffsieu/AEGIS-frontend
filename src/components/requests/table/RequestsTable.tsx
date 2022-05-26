import { FilterAltOutlined } from "@mui/icons-material";
import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material"
import { DateRange, displayDateRanges, getDateRanges } from "@utils/helpers/dateRange";
import { Dayjs } from "dayjs";


type Request = {
  callsign: string;
  dates: DateRange[];
  reason: string;
}

export type RequestsTableProps = {
  requests: Request[]
}

export default function RequestsTable(props: RequestsTableProps) {

  const {requests} = props;
  const theme = useTheme();

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
          <TableCell>
            Reason
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map(request => <TableRow>
          <TableCell>{request.callsign}</TableCell>
          <TableCell>{displayDateRanges(request.dates)}</TableCell>
          <TableCell>{request.reason}</TableCell>
        </TableRow>)}
      </TableBody>
    </TableContainer>
  );
}