import RequestForm, {
  RequestFormProps,
} from '@components/requests/form/RequestForm';
import { Box, Typography } from '@mui/material';
import { useAddRequestsMutation } from '@services/backend';
import { useAppSelector } from '@store/hooks';
import { RequestPeriod } from '@typing';

export type MemberNewRequestFormProps = RequestFormProps;

function MemberNewRequestFormWithAPI() {
  const userId = useAppSelector((state) => state.general.userId);
  const [addRequests] = useAddRequestsMutation();

  const props: MemberNewRequestFormProps = {
    onRequestCreate: (requestPeriods: RequestPeriod[]) => {
      addRequests(
        requestPeriods.map(({ startDate, endDate, reason }) => ({
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
          reason,
          memberId: userId,
        }))
      );
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
