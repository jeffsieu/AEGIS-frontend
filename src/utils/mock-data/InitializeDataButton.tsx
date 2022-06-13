import { Button, CircularProgress } from '@mui/material';
import {
  useClearDataMutation,
  useAddMemberMutation,
  useAddRoleMutation,
  useAddScheduleMutation,
  useAddRequestsMutation,
  useUpdateMemberRolesMutation,
} from '@services/backend';
import { useState } from 'react';
import { MEMBERS, QUALIFICATIONS, ROLES, SCHEDULES, REQUESTS } from './backend';

export default function InitializeDataButton() {
  const [loading, setLoading] = useState(false);
  const [clearData] = useClearDataMutation();
  const [addMember] = useAddMemberMutation();
  const [addRole] = useAddRoleMutation();
  const [addSchedule] = useAddScheduleMutation();
  const [updateMemberRoles] = useUpdateMemberRolesMutation();
  const [addRequests] = useAddRequestsMutation();

  async function onClick() {
    setLoading(true);
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

    for (const qualification of QUALIFICATIONS) {
      await updateMemberRoles({
        memberId: qualification.memberId,
        roleNames: qualification.roles,
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    for (const schedule of SCHEDULES) {
      await addSchedule(schedule);
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    await addRequests(REQUESTS);
    setLoading(false);
  }

  if (loading) {
    return (
      <>
        <CircularProgress />
        Populating backend...
      </>
    );
  }

  return (
    <Button variant="outlined" onClick={onClick}>
      Set backend data
    </Button>
  );
}
