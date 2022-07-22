import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { Guide } from '@typing/guide';
import { GuideImage } from '@views/Shared/GuidePage/GuidePage';

import GuideRequest1 from '@assets/guide-request-1.png';
import GuideRequest2 from '@assets/guide-request-2.png';
import GuideRequest3 from '@assets/guide-request-3.png';
import GuideRequest4 from '@assets/guide-request-4.png';
import GuideRequest5 from '@assets/guide-request-5.png';
import GuideRequest6 from '@assets/guide-request-6.png';
import GuideRequest7 from '@assets/guide-request-7.png';

export const RequestGuide: Guide = {
  title: 'Creating requests',
  steps: [
    {
      label: 'Navigate to the Requests page',
      content: (
        <div>
          <Typography variant="body1">
            Click "Requests" in the top navigation bar to navigate to the
            Requests page.
          </Typography>
          <GuideImage src={GuideRequest1} alt="Requests page" />
        </div>
      ),
    },
    {
      label: "Click 'New request'",
      content: (
        <GuideImage
          src={GuideRequest2}
          alt="'New request' button on the Requests page"
        />
      ),
    },
    {
      label: 'Fill in request details',
      content: (
        <div>
          <GuideImage src={GuideRequest3} alt="Request details form" />
          <Typography variant="body1">
            <ul>
              <li>
                Dates: The respective dates.
                <ul>
                  <li>Note: Multiple dates can be chosen.</li>
                </ul>
              </li>
              <li>Callsign: The callsign of the affected individual.</li>
              <li>
                Type: Work/Personal.
                <ul>
                  <li>Note: This affects the request's priority.</li>
                </ul>
              </li>
              <li>
                Reason: The reason, or a brief description of the request.
              </li>
            </ul>
          </Typography>
        </div>
      ),
    },
    {
      label: 'Add more periods',
      optional: true,
      content: (
        <div>
          <Typography variant="body1">
            You may add more periods to the request if applicable. This can be
            done by clicking/focusing on any of the fields under the placeholder
            "Add period" section.
          </Typography>
          <GuideImage src={GuideRequest4} alt="'Add period' section" />
        </div>
      ),
    },
    {
      label: 'Create request',
      content: (
        <div>
          <Typography variant="body1">
            Click the "Create request" button.
          </Typography>
          <GuideImage src={GuideRequest5} alt="'Create request' button" />
        </div>
      ),
    },
    {
      label: 'Acknowledgement of Data Classification and Personal Data',
      content: (
        <div>
          <Typography variant="body1">
            Check that your entered data complies with the OFFICIAL(OPEN) classification
            and does not include personal information that may be regulated under { }
            <Link href="https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Resource-for-Individuals/what-you-need-to-know-about-pdpa-v1-0.pdf?la=en"> 
            PDPA
            </Link>.
          </Typography>
          <GuideImage src={GuideRequest6} alt="Acknowledgement of Data Classification and Personal Data" />
        </div>
      ),
    },
    {
      label: 'Check Boxes to Acknowledge and Create Request',
      content: (
        <div>
          <Typography variant="body1">
            Check both boxes and click on the 'Create Request' button to submit your request.
          </Typography>
          <GuideImage src={GuideRequest7} alt="Check Boxes to Acknowledge and Create Request" />
        </div>
      ),
    },
  ],
};

export default RequestGuide;
