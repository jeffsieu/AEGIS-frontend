import RequestForm from '@components/requests/form/RequestForm';
import { Box, Typography } from '@mui/material';

export type MemberNewRequestFormProps = {};

function MemberNewRequestForm(props: MemberNewRequestFormProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Create new request
      </Typography>
      <RequestForm />
    </Box>
  );
}

export default MemberNewRequestForm;
