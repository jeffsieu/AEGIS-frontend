import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

// A tooltip that has a similar color to the background color of the current theme.
const PaperTooltip = styled<React.JSXElementConstructor<TooltipProps>>(
  ({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor:
      theme.palette.mode === 'light' && theme.palette.background.paper, // Only set the background color if the theme is light
    color: theme.palette.primary.main,
    boxShadow: (theme.shadows as string[])[4],
    fontSize: 13,
  },
}));

export default PaperTooltip;
