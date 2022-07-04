import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import {
    useGetMembersQuery,
  } from '@services/backend';
import { Backend } from '@typing/backend';

export type ScheduleCallsignFilterProps = {
};

function ScheduleCallsignFilter(props: ScheduleCallsignFilterProps) {
    const { data: members } = useGetMembersQuery();

  return (
    <FormControl>
        <InputLabel>Callsign</InputLabel>
        {/* <Select>
            {members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
                {member.callsign}
            </MenuItem>
            ))}
        </Select> */}
    </FormControl>
  );
}

export default ScheduleCallsignFilter;
