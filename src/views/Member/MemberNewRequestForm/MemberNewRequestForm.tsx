import RequestForm, {
  RequestFormProps,
} from '@components/requests/form/RequestForm';
import { Box, Typography } from '@mui/material';
import { RequestPeriod } from '@typing';

export type MemberNewRequestFormProps = RequestFormProps;

function MemberNewRequestFormWithAPI() {
  const props: MemberNewRequestFormProps = {
    onRequestCreate: (requestPeriods: RequestPeriod[]) => {
      console.log(requestPeriods);
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
