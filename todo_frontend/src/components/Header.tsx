import React from "react";
import { useNavigate } from "react-router";
import { useCookies } from 'react-cookie';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';


const Header = () => {
  const [ , ,removeCookie] = useCookies(['userToken']);
  const navigate = useNavigate()
  return <AppBar position="static">
  <Container maxWidth="xl">
    <Toolbar disableGutters>

      <IconButton onClick={() => navigate('/ensolvers-challenge/')}>
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
      <IconButton onClick={() => removeCookie('userToken')}>
        <LogoutIcon></LogoutIcon>
      </IconButton>
    </Toolbar>
  </Container>
</AppBar>;
};

export default Header;
