import { Tooltip, tooltipClasses } from '@mui/material';
import { styled } from '@mui/system';
import { neutrals } from 'hummingbird-ui';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: neutrals[50],
    color: neutrals[400],
    boxShadow: theme.shadows[4],
    fontSize: 13,
  },
}));

export default LightTooltip;
