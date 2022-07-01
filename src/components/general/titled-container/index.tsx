import { Box, Divider, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import StickyHeader from '../sticky-header';

export type TitledContainerProps = {
  title: string;
  endComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
};

function TitledContainer(props: PropsWithChildren<TitledContainerProps>) {
  const { title, children, endComponent, bottomComponent } = props;
  return (
    <Box display="flex" flexDirection="column" alignItems="inherit" gap={4}>
      <StickyHeader>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingTop={2}
          paddingBottom={1}
        >
          <Typography variant="h4">{title}</Typography>
          {endComponent}
        </Box>
        {bottomComponent}
        <Divider />
      </StickyHeader>
      <div>{children}</div>
    </Box>
  );
}

export default TitledContainer;
