import EmptyHint from '@components/general/empty-hint';
import { Box, Typography } from '@mui/material';
import { ERROR_NO_SCHEDULES } from '@utils/constants/string';

function MemberPublishedPage() {
  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        Schedules
      </Typography>
      <EmptyHint>{ERROR_NO_SCHEDULES}</EmptyHint>
    </Box>
  );
}

export default MemberPublishedPage;
