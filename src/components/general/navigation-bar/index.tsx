import {
  AppBar,
  Box,
  Button,
  ButtonProps,
  Container,
  IconButton,
  Link,
  Paper,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.css';
import { Close } from '@mui/icons-material';

type NavigationBarProps = {
  title: {
    label: string;
    onClick: () => void;
  };
  links: {
    label: string;
    onClick: () => void;
    ButtonProps?: Omit<ButtonProps, 'onClick'>;
  }[];
  actions: {
    label: string;
    onClick: () => void;
    ButtonProps?: Omit<ButtonProps, 'onClick'>;
  }[];
};

function NavigationBar(props: NavigationBarProps) {
  const { title, links, actions } = props;

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const linkButtons = links.map((link, index) => (
    <Button
      key={index}
      sx={{ fontWeight: 'bold' }}
      onClick={() => {
        link.onClick();
        setOpen(false);
      }}
      {...link.ButtonProps}
    >
      {link.label}
    </Button>
  ));

  const actionButtons = actions.map((action, index) => (
    <Button
      key={index}
      onClick={() => {
        action.onClick();
        setOpen(false);
      }}
      {...action.ButtonProps}
    >
      {action.label}
    </Button>
  ));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <Box position="fixed" width="100%" zIndex={5}>
        <AppBar
          elevation={trigger ? 4 : 0}
          position="static"
          color={theme.palette.mode === 'light' ? 'transparent' : undefined}
          sx={
            theme.palette.mode === 'light'
              ? {
                  background: theme.palette.background.paper,
                }
              : undefined
          }
        >
          <Toolbar className="navigation-bar" disableGutters>
            <Container>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexGrow="1"
              >
                <Box display="flex" alignItems="center" gap={6}>
                  <Box display="flex" alignItems="center">
                    {isSmallScreen && (
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(!open)}
                      >
                        <MenuIcon />
                      </IconButton>
                    )}
                    <Link
                      component="button"
                      color="inherit"
                      underline="none"
                      variant="h6"
                      onClick={title.onClick}
                    >
                      {title.label}
                    </Link>
                  </Box>
                  {isSmallScreen || (
                    <Box display="flex" gap={1}>
                      {linkButtons}
                    </Box>
                  )}
                </Box>
                {isSmallScreen || (
                  <Box display="flex" gap={1}>
                    {actionButtons}
                  </Box>
                )}
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
        <CSSTransition
          in={isSmallScreen && open}
          unmountOnExit
          classNames="mobile-menu"
          timeout={300}
        >
          <div key="mobile-menu">
            <Paper
              elevation={4}
              square
              sx={{
                boxShadow:
                  '0px 6px 4px -1px rgb(0 0 0 / 5%), 0px 7px 5px 0px rgb(0 0 0 / 7%), 0px 7px 5px 0px rgb(0 0 0 / 6%)',
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={2}
              >
                <Box display="flex" flexDirection="column" gap={1}>
                  {linkButtons}
                </Box>
                <Box mt={2} />
                <Box display="flex" flexDirection="column" gap={1}>
                  {actionButtons}
                </Box>
                <Box width="100%" textAlign="right">
                  <IconButton
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </div>
        </CSSTransition>
      </Box>
      <Toolbar sx={{ pointerEvents: 'none' }} />
    </>
  );
}

export default NavigationBar;
