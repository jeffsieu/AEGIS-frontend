import { FilterList } from '@mui/icons-material';
import { Autocomplete, Button, TextField } from '@mui/material';
import { Backend } from '@typing/backend';
import { useState } from 'react';

export type ScheduleSelectOption = Backend.Entry<
  Backend.Member & {
    roles: Backend.Role[];
  }
>;

export type ScheduleSelectMemberProps = {
  members: ScheduleSelectOption[];
  selectedMembers: ScheduleSelectOption[];
  onSelectedMembersChange: (members: ScheduleSelectOption[]) => void;
};

function ScheduleSelectMember(props: ScheduleSelectMemberProps) {
  const { members, selectedMembers, onSelectedMembersChange } = props;

  const [isSearchEnabled, setSearchEnabled] = useState(false);

  if (isSearchEnabled) {
    return (
      <Autocomplete
        multiple
        autoComplete
        autoHighlight
        openOnFocus
        options={members}
        getOptionLabel={(member) => member.callsign}
        onChange={(event, newMembers) => {
          onSelectedMembersChange(newMembers);
        }}
        value={selectedMembers}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            autoFocus
            label="Filter by callsign/s"
            placeholder="Callsign..."
          />
        )}
      />
    );
  } else {
    return (
      <div>
        <Button
          variant="outlined"
          startIcon={<FilterList />}
          onClick={() => {
            setSearchEnabled(true);
          }}
        >
          Filter duties by callsign
        </Button>
      </div>
    );
  }
}

export default ScheduleSelectMember;
