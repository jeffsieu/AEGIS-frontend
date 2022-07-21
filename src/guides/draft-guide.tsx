import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { Guide } from '@typing/guide';
import { GuideImage } from '@views/Shared/GuidePage/GuidePage';

import GuideDraft1 from '@assets/guide-draft-1.png';
import GuideDraft2 from '@assets/guide-draft-2.png';
import GuideDraft3 from '@assets/guide-draft-3.png';
import GuideDraft4 from '@assets/guide-draft-4.png';
import GuideDraft5 from '@assets/guide-draft-5.png';
import GuideDraft6 from '@assets/guide-draft-6.png';
import GuideDraft7 from '@assets/guide-draft-7.png';
import GuideDraft8 from '@assets/guide-draft-8.png';
import GuideDraft9 from '@assets/guide-draft-9.png';
import GuideDraft10 from '@assets/guide-draft-10.png';
import GuideDraft11 from '@assets/guide-draft-11.png';
import GuideDraft12 from '@assets/guide-draft-12.png';
import GuideDraft13 from '@assets/guide-draft-13.png';
import GuideDraft14 from '@assets/guide-draft-14.png';
import GuideDraft15 from '@assets/guide-draft-15.png';
import GuideDraft16 from '@assets/guide-draft-16.png';

export const DraftGuide: Guide = {
  title: 'Drafting schedules',
  steps: [
    {
      label: 'Click "New draft"',
      content: (
        <div>
          <Typography variant="body1">
            Click "New draft" at the top-right of the navigation bar to navigate
            to the drafting page.
          </Typography>
          <GuideImage
            src={GuideDraft1}
            alt="'New draft' button at the top-right of the navigation bar"
          />
        </div>
      ),
    },
    {
      label: 'Select draft month',
      content: (
        <div>
          <Typography variant="body1">
            Select the month to begin drafting for. The latest month without a
            draft will be automatically selected.
          </Typography>
          <GuideImage src={GuideDraft2} alt="Month selection button" />
        </div>
      ),
    },
    {
      label: 'Select dates to schedule for each role',
      content: (
        <div>
          <Typography variant="body1">
            For each role, select the dates that require scheduling for that
            particular role.
          </Typography>
          <GuideImage src={GuideDraft3} alt="Role date selection section" />
        </div>
      ),
    },
    {
      label: 'Click "Create" to create a new draft',
      content: (
        <div>
          <Typography variant="body1">
            Select "Create" to create a new draft for the selected month.
          </Typography>
          <GuideImage
            src={GuideDraft4}
            alt="'Create' button at the bottom of the page"
          />
          <Typography variant="body1">
            You will be brought to the draft page shortly.
          </Typography>
          <GuideImage src={GuideDraft5} alt="Example draft page" />
        </div>
      ),
    },
    {
      label: 'Schedule a duty',
      content: (
        <div>
          <Typography variant="body1">
            Schedule someone for a duty by clicking a "Pending" duty.
          </Typography>
          <GuideImage src={GuideDraft6} alt="'Pending' duty" />
          <Typography variant="body1">
            A dropdown menu will appear, showing everyone qualified for the
            duty.
          </Typography>
          <GuideImage src={GuideDraft7} alt="Dropdown showing 5 members" />
        </div>
      ),
    },
    {
      label: 'Use info from the dropdown to assist scheduling',
      optional: true,
      content: (
        <div>
          To explain the dropdown, the following example will be used.
          <GuideImage
            src={GuideDraft8}
            alt="Example dropdown showing 7 members; Echo is currently selected"
          />
          <Box marginY={4}>
            <Divider />
          </Box>
          <Typography variant="h6" gutterBottom>
            Assigned duty count
          </Typography>
          <GuideImage
            src={GuideDraft9}
            alt="Echo is currently selected, he has 1 duty assigned (this one)"
          />
          <Typography variant="body1">
            The number beside each member indicates <b>the number of duties</b>{' '}
            they have scheduled for the month. This will be 0 for everyone on an
            empty schedule. As you schedule duties, this number will increase.
          </Typography>
          <Box marginY={4}>
            <Divider />
          </Box>
          <Typography variant="h6" gutterBottom>
            Available/unavailable members
          </Typography>
          <Typography variant="body1">
            Members are split into <b>available</b> and <b>unavailable</b>. An
            unavailable member is someone who has one of the following:
            <ul>
              <li>Another duty on the same day</li>
              <li>A request for off-duty</li>
            </ul>
            The nature of the unavailability is indicated by the icon beside the
            member's name. Hovering over the member will also list the specific
            reasons as a tooltip.
          </Typography>
          <GuideImage
            src={GuideDraft10}
            alt="Example: Foxtrot is unavailable (work reason) because... he is lazy"
          />
          <Box marginY={4}>
            <Divider />
          </Box>{' '}
          <Typography variant="h6" gutterBottom>
            Assigning unavailable members
          </Typography>
          <Typography variant="body1">
            <b>Unavailable members may still be assigned.</b> They will appear{' '}
            <b>red</b> in the draft.
            <ul>
              <li>Another duty on the same day</li>
              <li>A request for off-duty</li>
            </ul>
            The nature of the unavailability is indicated by the icon beside the
            member's name. Hovering over the member will also list the specific
            reasons as a tooltip.
          </Typography>
          <GuideImage
            src={GuideDraft11}
            alt="Foxtrot is red because he was unavailable but still assigned (too bad)"
          />
          <Typography variant="body1">
            A <i>clash</i> will also be shown at the bottom of the page.
          </Typography>
          <GuideImage
            src={GuideDraft12}
            alt="Example clash involving lazy Foxtrot"
          />
        </div>
      ),
    },
    {
      label: 'Continue scheduling',
      content: (
        <div>
          <Typography variant="body1">
            Keep scheduling members until the schedule is filled. The progress
            bar above will indicate how much of the schedule is completed.
          </Typography>
          <GuideImage
            src={GuideDraft13}
            alt="The progress bar shows that the draft is 4.0% completed"
          />
          <Typography variant="body1">
            Remember to save your progress by clicking the "Save" button at the
            top-right of the page.
          </Typography>
          <GuideImage
            src={GuideDraft14}
            alt="The 'Save' button at the top-right of the page"
          />
          <Typography variant="body1">
            The draft can be deleted at any time by clicking the "Delete" button
            at the top-right of the page.
          </Typography>
          <GuideImage
            src={GuideDraft15}
            alt="The 'Delete' button at the top-right of the page"
          />
        </div>
      ),
    },
    {
      label: 'Publish draft',
      content: (
        <div>
          <Typography variant="body1">
            When you are done scheduling, click the "Publish" button at the
            top-right of the page.
          </Typography>
          <GuideImage
            src={GuideDraft16}
            alt="The 'Publish' button at the top-right of the page"
          />
          <Typography variant="body1">
            You will then be redirected to the published draft page. Once
            published, the published schedule will be available for all members
            to view. You can <i>unpublish</i> (then delete) the draft at any
            time.
          </Typography>
        </div>
      ),
    },
  ],
};

export default DraftGuide;
