import TitledContainer from '@components/general/titled-container';
import RequestForm, {
  RequestFormProps,
} from '@components/requests/form/RequestForm';
import { useAddRequestsMutation, useGetMembersQuery } from '@services/backend';
import { RequestPeriod } from '@typing';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useNavigate } from 'react-router-dom';

export type MemberNewRequestFormProps = RequestFormProps;

function MemberNewRequestFormWithAPI() {
  const navigate = useNavigate();
  const [addRequests] = useAddRequestsMutation();

  return useBuildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
    },
    onSuccess: ({ members }) => {
      const props: MemberNewRequestFormProps = {
        members: members,
        onRequestCreate: async (requestPeriods: RequestPeriod[]) => {
          await addRequests(
            requestPeriods.map(({ startDate, endDate, reason, member }) => ({
              startDate: startDate.format('YYYY-MM-DD'),
              endDate: endDate.format('YYYY-MM-DD'),
              reason,
              memberId: member.id,
            }))
          );
          navigate('/requests');
        },
      };
      return <MemberNewRequestForm {...props} />;
    },
  });
}

function MemberNewRequestForm(props: MemberNewRequestFormProps) {
  return (
    <TitledContainer title="Create new request">
      <RequestForm {...props} />
    </TitledContainer>
  );
}

export default MemberNewRequestFormWithAPI;
export { MemberNewRequestForm as MemberNewRequestFormWithProps };
