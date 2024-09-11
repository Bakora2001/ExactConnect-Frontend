import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CommonButton } from './CommonButton';

export const Header =() => {
  return (
    <Box>
      <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: "#7C25BA" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ExactConnect
          </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Rasidential Proxy
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              VPS Server
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              VCC Card
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Non-Voip Numbers
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Contact us
            </Typography>
          <CommonButton variant="outlined" label="Get Started" color="inherit" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
