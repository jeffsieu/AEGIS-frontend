import { Box, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';
import './index.css';

export type FullWidthScheduleContainerProps = {};

function FullWidthScheduleContainer(
  props: PropsWithChildren<FullWidthScheduleContainerProps>
) {
  const theme = useTheme();

  return (
    <Box width="100vw" position="relative" display="inline-block">
      <Box
        className="full-width-container"
        sx={{
          '&::before': {
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
            content: '""',
            // background: 'red',
            position: 'absolute',
            zIndex: 5,
            background: `linear-gradient(-90deg, ${theme.palette.background.paper} 0px, ${theme.palette.background.paper} 16px, transparent 32px);`,
          },
          '&:hover': {
            '&::before': {
              height: 'calc(100% - 32px)',
            },
          },
        }}
      >
        <Box display="flex">
          <Box paddingLeft={2} paddingRight={4} paddingBottom={2}>
            {props.children}
          </Box>
        </Box>
      </Box>
      {/* <Box
        width="100%"
        height="100%"
        zIndex={2}
        position="absolute"
        top={0}
      ></Box> */}
    </Box>
  );
}

export default FullWidthScheduleContainer;
