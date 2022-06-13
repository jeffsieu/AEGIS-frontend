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
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Create new request
      </Typography>
      <RequestForm {...props} />
    </Box>
  );
}

export default MemberNewRequestFormWithAPI;
export { MemberNewRequestForm as MemberNewRequestFormWithProps };
