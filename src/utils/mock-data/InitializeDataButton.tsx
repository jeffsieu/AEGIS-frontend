import { Button } from '@mui/material';
import {
  useClearDataMutation,
  useAddMemberMutation,
  useAddRoleMutation,
  useAddScheduleMutation,
} from '@services/backend';
import { MEMBERS, ROLES, SCHEDULES } from './backend';

export default function InitializeDataButton() {
  const [clearData] = useClearDataMutation();
  const [addMember] = useAddMemberMutation();
  const [addRole] = useAddRoleMutation();
  const [addSchedule] = useAddScheduleMutation();

  async function onClick() {
    await clearData();
    await new Promise((resolve) => setTimeout(resolve, 300));

    for (const member of MEMBERS) {
      await addMember(member);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    for (const role of ROLES) {
      await addRole(role);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    for (const schedule of SCHEDULES) {
      await addSchedule(schedule);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  return <Button onClick={onClick}>Set backend data</Button>;
}
