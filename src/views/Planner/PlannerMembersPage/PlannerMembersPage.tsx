import MemberTable, {
  MemberTableProps,
} from '@components/members/MemberTable/MemberTable';
import { Box, Typography } from '@mui/material';
import { RootState } from '@store';
import { Role } from '@typing';
import { connect } from 'react-redux';

export type PlannerMembersPageStateProps = Pick<MemberTableProps, 'members'>;
export type PlannerMembersPageDispatchProps = Pick<
  MemberTableProps,
  'onMemberRolesChange'
>;
export type PlannerMembersPageProps = PlannerMembersPageStateProps &
  PlannerMembersPageDispatchProps;

function mapStateToProps(state: RootState): PlannerMembersPageStateProps {
  return {
    members: state.members.members,
  };
}

function mapDispatchToProps(dispatch: any): PlannerMembersPageDispatchProps {
  return {
    onMemberRolesChange: (callsign: string, roles: Role[]) => {
      // TODO: Add action
    },
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(PlannerMembersPage);
export { PlannerMembersPage as PlannerMembersPageWithProps };
