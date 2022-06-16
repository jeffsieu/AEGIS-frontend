import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import './index.css';

export type FullWidthScheduleContainerProps = {};

function FullWidthScheduleContainer(
  props: PropsWithChildren<FullWidthScheduleContainerProps>
) {
  return (
    <Box width="100vw" position="relative" className="full-width-container">
      <Box display="flex">
        <Box paddingX={4}>{props.children}</Box>
      </Box>
    </Box>
  );
}

export default FullWidthScheduleContainer;
