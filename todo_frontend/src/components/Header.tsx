import React from "react";
import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';


const Header = () => {
  const navigate = useNavigate()
  return <AppBar position="static">
  <Container maxWidth="xl">
    <Toolbar disableGutters>

      <IconButton onClick={() => navigate('/')}>
        <HomeIcon></HomeIcon>
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        TODOs
      </Typography>
    </Toolbar>
  </Container>
</AppBar>;
};

export default Header;
