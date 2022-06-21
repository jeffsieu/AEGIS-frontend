import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './index.css';

export type FadeTransitionProps = {
  transitionKey?: string;
};

function FadeTransition(props: PropsWithChildren<FadeTransitionProps>) {
  return (
    <Box
      position="relative"
      sx={{
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <TransitionGroup component={null}>
        <CSSTransition
          key={props.transitionKey}
          classNames="fade"
          timeout={{
            enter: 400,
            exit: 200,
          }}
          mountOnEnter={false}
          unmountOnExit={true}
        >
          <Box position="absolute" width="100%" left={0}>
            <Box position="relative">{props.children}</Box>
          </Box>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
}

export default FadeTransition;
