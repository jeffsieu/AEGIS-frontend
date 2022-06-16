import { Box, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export type TitledContainerProps = {
  title: string;
};

function TitledContainer(props: PropsWithChildren<TitledContainerProps>) {
  const { title, children } = props;
  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <div>{children}</div>
    </Box>
  );
}

export default TitledContainer;
