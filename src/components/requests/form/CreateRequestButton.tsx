import { Add } from '@mui/icons-material';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useAddRequestsMutation, useGetMembersQuery } from '@services/backend';
import { RequestPeriod } from '@typing';
import { useBuildWithApiQueries } from '@utils/helpers/api-builder';
import { useState } from 'react';
import RequestForm from './RequestForm';

function CreateRequestButton() {
  const theme = useTheme();
  const [isCreating, setCreating] = useState(false);
  const [addRequests] = useAddRequestsMutation();

  return useBuildWithApiQueries({
    queries: {
      members: useGetMembersQuery(),
    },
    onSuccess: ({ members }) => {
      const onRequestCreate = async (requestPeriods: RequestPeriod[]) => {
        await addRequests(
          requestPeriods.map(({ dates, reason, member, type }) => ({
            dates: dates.map((date) => date.format('YYYY-MM-DD')),
            reason,
            type,
            memberId: member.id,
          }))
        );
        setCreating(false);
      };

      if (isCreating) {
        return (
          <Stack spacing={4}>
            <Typography variant="h5" color={theme.palette.text.secondary}>
              New request
            </Typography>
            <RequestForm members={members} onRequestCreate={onRequestCreate} />
            <Divider />
          </Stack>
        );
      } else {
        return (
          <Button
            variant="outlined"
            startIcon={<Add />}
            onClick={() => {
              setCreating(true);
            }}
          >
            New request
          </Button>
        );
      }
    },
  });
}

export default CreateRequestButton;
