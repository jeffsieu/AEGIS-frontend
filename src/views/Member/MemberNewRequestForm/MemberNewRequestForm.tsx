import TitledContainer from '@components/general/titled-container';
import RequestForm, {
  RequestFormProps,
} from '@components/requests/form/RequestForm';
import { Box, Typography } from '@mui/material';
import { useAddRequestsMutation } from '@services/backend';
import { useAppSelector } from '@store/hooks';
import { RequestPeriod } from '@typing';
import { useNavigate } from 'react-router-dom';

export type MemberNewRequestFormProps = RequestFormProps;

function MemberNewRequestFormWithAPI() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.general.userId);
  const [addRequests] = useAddRequestsMutation();

  const props: MemberNewRequestFormProps = {
    onRequestCreate: async (requestPeriods: RequestPeriod[]) => {
      await addRequests(
        requestPeriods.map(({ startDate, endDate, reason }) => ({
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          reason,
          memberId: userId,
        }))
      );
      navigate('/requests');
    },
  };
  return <MemberNewRequestForm {...props} />;
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
