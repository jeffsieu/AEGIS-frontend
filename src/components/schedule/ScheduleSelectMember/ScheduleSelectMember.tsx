import { 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent } from '@mui/material';
import { Backend } from '@typing/backend';

export type ScheduleSelectMemberProps = {
  members: Backend.Entry<Backend.Member & {
    roles: Backend.Role[];
    }>[];
    selectedMember: string | undefined;
    handleSelectedMemberChange: (event: SelectChangeEvent) => void;
};

function ScheduleSelectMember(props: ScheduleSelectMemberProps) {
    const { members, selectedMember, handleSelectedMemberChange } = props;

    return (
    <FormControl style={{minWidth: '34%'}}>
        <InputLabel>Callsign</InputLabel>
        <Select
            value={selectedMember}
            onChange={handleSelectedMemberChange}
            >
            <MenuItem value=''><Typography color="primary"><strong>See All</strong></Typography></MenuItem>
            {members.map((member) => (
            <MenuItem key={member.id} value={member.callsign}>
                {member.callsign}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
    );
};

export default ScheduleSelectMember;
