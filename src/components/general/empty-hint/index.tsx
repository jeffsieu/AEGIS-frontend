import { Typography, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

function EmptyHint(props: PropsWithChildren<{}>) {
  const theme = useTheme();

  return (
    <Typography variant="h6" color={theme.palette.text.secondary}>
      {props.children}
    </Typography>
  );
}

export default EmptyHint;
