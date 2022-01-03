import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@material-ui/core';


const Footer = () => {
  return (
    <AppBar sx={{ top: 'auto', bottom: 0 }}>
      <Container>
        <Toolbar>
        <footer>
          <div>
            <p>
              Copyright &copy;Jessica Martin 2021
            </p>
          </div>
        </footer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;