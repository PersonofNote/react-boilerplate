import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Container } from '@material-ui/core';

import { ReactComponent as LinkedInIcon} from '../assets/social-icons/linkedin.svg';
import { ReactComponent as GithubIcon} from '../assets/social-icons/github.svg';

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
          <div className="footer-icons"><a href="https://github.com/PersonofNote" className="footer-icon"><GithubIcon /></a><a href="https://www.linkedin.com/in/jessica-lee-taylor-martin/" className="footer-icon"><LinkedInIcon /></a></div>
        </footer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;