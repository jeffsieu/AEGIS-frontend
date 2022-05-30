import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './index.css';
import { Close } from '@mui/icons-material';

type NavigationBarProps = {
  title: string;
  links: {
    label: string;
    onClick: () => void;
  }[];
  actions: {
    label: string;
    onClick: () => void;
  }[];
};

function NavigationBar(props: NavigationBarProps) {
  const { title, links, actions } = props;

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <AppBar
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
                  <Typography variant="h6">{title}</Typography>
                </Box>
                {isSmallScreen || (
                  <div>
                    {links.map((link) => (
                      <Button
                        sx={{ fontWeight: 'bold' }}
                        onClick={link.onClick}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </div>
                )}
              </Box>
              {isSmallScreen || (
                <div>
                  {actions.map((action) => (
                    <Button variant="contained" onClick={action.onClick}>
                      {action.label}
                    </Button>
                  ))}
                </div>
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
              {links.map((link) => (
                <Button sx={{ fontWeight: 'bold' }} onClick={link.onClick}>
                  {link.label}
                </Button>
              ))}
              <Box mt={2} />
              {actions.map((action) => (
                <Button variant="contained" onClick={action.onClick}>
                  {action.label}
                </Button>
              ))}
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
    </div>
  );
}

export default NavigationBar;
