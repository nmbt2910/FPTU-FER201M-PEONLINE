import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Button variant="h6" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button variant="h6" component={Link} to="/addform">
          AddForm
        </Button>
        <Button component={Link} to="/top-news" color="inherit">
          Top News
        </Button>
        <Button component={Link} to="/contact" color="inherit">
          Contact
        </Button>
        <Button component={Link} to="/signin" color="inherit">
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;