import { Box, useTheme } from '@mui/material';
import useAppBarHeight from '@utils/helpers/app-bar-height';
import { PropsWithChildren } from 'react';

function StickyHeader(props: PropsWithChildren<{}>) {
  const appBarHeight = useAppBarHeight();
  const theme = useTheme();

  return (
    <Box
      position="sticky"
      top={appBarHeight}
      bgcolor={theme.palette.background.default}
      zIndex={2}
    >
      {props.children}
    </Box>
  );
}

export default StickyHeader;
