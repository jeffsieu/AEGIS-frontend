import MemberTable, {
  MemberEntry,
  MemberTableProps,
} from '@components/members/MemberTable/MemberTable';
import { Box, Typography } from '@mui/material';
import { Role } from '@typing';
import {
  useGetMembersQuery,
  useGetRolesQuery,
  useUpdateMemberRolesMutation,
} from '@services/backend';
import { buildWithApiQueries } from '@utils/helpers/api-builder';

export type PlannerMembersPageProps = MemberTableProps;

function PlannerMembersPageWithAPI() {
  const [updateMemberRoles] = useUpdateMemberRolesMutation();

  return buildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
      roles: useGetRolesQuery(),
    },
    onSuccess: ({ members, roles }) => {
      const mappedMembers = members.map((member) => {
        const memberRoles = member.roles;
        const rolesMap: MemberEntry['roles'] = {};
        for (const role of roles) {
          rolesMap[role.name] = memberRoles.some(
            (memberRole) => memberRole.name === role.name
          );
        }
        return {
          ...member,
          roles: rolesMap,
        };
      });

      const props: PlannerMembersPageProps = {
        members: mappedMembers,
        onMemberRolesChange: (callsign: string, roles: Role[]) => {
          updateMemberRoles({
            memberId: mappedMembers.find(
              (member) => member.callsign === callsign
            )!.id,
            roleNames: roles.map((role) => role.name),
          });
        },
      };

      return <PlannerMembersPage {...props}></PlannerMembersPage>;
    },
  });
}

function PlannerMembersPage(props: PlannerMembersPageProps) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Typography variant="h4" gutterBottom>
        Members
      </Typography>
      <MemberTable {...props} />
    </Box>
  );
}

export default PlannerMembersPageWithAPI;
export { PlannerMembersPage as PlannerMembersPageWithProps };
