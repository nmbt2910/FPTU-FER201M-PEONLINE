import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{
              fontFamily: 'Arial',
              fontSize: '20px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textTransform: 'uppercase',
              padding: '4px 8px',
              margin: '4px',
            }}
          >
            My Website
          </Button>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton color="inherit" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
        </Box>
        <Drawer anchor="right" open={menuOpen} onClose={toggleMenu}>
          <List>
            <ListItem button component={Link} to="/dashboard" onClick={toggleMenu}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/addform" onClick={toggleMenu}>
              <ListItemText primary="AddForm" />
            </ListItem>
            <ListItem button component={Link} to="/top-news" onClick={toggleMenu}>
              <ListItemText primary="Top News" />
            </ListItem>
            <ListItem button component={Link} to="/contact" onClick={toggleMenu}>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={Link} to="/signin" onClick={toggleMenu}>
              <ListItemText primary="Sign in" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;