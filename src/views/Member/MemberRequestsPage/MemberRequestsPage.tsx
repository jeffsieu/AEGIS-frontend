import EmptyHint from '@components/general/empty-hint';
import { Box, Typography } from '@mui/material';
import { ERROR_NO_REQUESTS } from '@utils/constants/string';

type MemberRequestPageProps = {};

function MemberRequestPage(props: MemberRequestPageProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Requests
      </Typography>
      <EmptyHint>{ERROR_NO_REQUESTS}</EmptyHint>
    </Box>
  );
}

export default MemberRequestPage;
