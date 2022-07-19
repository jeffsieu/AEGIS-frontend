import { useState } from 'react';

import {
    Box,
    Divider,
    Stack,
    Typography } from '@mui/material';
import { 
    InfoOutlined, 
    ModeEdit } from '@mui/icons-material';

import { AsyncButton } from '@components/general/async-button';
import ScheduleTable, { ScheduleTableProps } from '@components/schedule/ScheduleTable/ScheduleTable';
import FullWidthScheduleContainer from '@components/schedule/FullWidthScheduleContainer/FullWidthScheduleContainer';
import PaperTooltip from '@components/tooltips/PaperTooltip';
import ScheduleHeader from '@components/schedule/ScheduleHeader/ScheduleHeader';
import ScheduleSelectMember from '@components/schedule/ScheduleSelectMember/ScheduleSelectMember';

import { Backend } from '@typing/backend';

type PlannerPublishedSchedulePageProps =  ScheduleTableProps & {
    onUnpublishClick: () => Promise<void>;
    isUnpublishing: boolean;
    members: Backend.Entry<
      Backend.Member & {
        roles: Backend.Role[];
      }
    >[];
    viewOnly?: boolean;
};

function PublishedSchedulePage(  props: PlannerPublishedSchedulePageProps ) {
    const { startDate, endDate, onUnpublishClick, isUnpublishing, members, viewOnly } =
    props;
    const [selectedMembers, setSelectedMembers] = useState<typeof members>([]);
    const handleSelectedMembersChange = (newMembers: typeof members) => {
        setSelectedMembers(newMembers);
      };

  return (
    <Stack spacing={4}>
    <Box position="relative">
      <ScheduleHeader
        startDate={startDate}
        endDate={endDate}
        isPublished={true}
      />
      { viewOnly ? null : <Box
        position="absolute"
        top={0}
        right={0}
        display="flex"
        flexDirection="column"
        alignItems="end"
      >
        <PaperTooltip
          placement="right"
          title={
            <Box display="flex" alignItems="center" gap={1}>
              <InfoOutlined
                fontSize="small"
                color="secondary"
              />
              <Typography color="secondary">
                Schedule will be unpublished
              </Typography>
            </Box>
          }
        >
          <div>
            <AsyncButton
              startIcon={<ModeEdit />}
              loading={isUnpublishing}
              variant="outlined"
              asyncRequest={onUnpublishClick}
            >
              Edit/Delete
            </AsyncButton>
          </div>
        </PaperTooltip>
      </Box>
      }
    </Box>
    <ScheduleSelectMember
      members={members}
      selectedMembers={selectedMembers}
      onSelectedMembersChange={handleSelectedMembersChange}
    />
    <Divider />
    <Box
      display="flex"
      position="relative"
      flexDirection="column"
      alignItems="center"
    >
      <FullWidthScheduleContainer>
        <ScheduleTable
          {...props}
          selectedMembers={
            selectedMembers.length > 0 ? selectedMembers : undefined
          }
        />
      </FullWidthScheduleContainer>
    </Box>
  </Stack>
  )
}

export default PublishedSchedulePage;