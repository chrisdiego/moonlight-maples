import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import logoText from './images/logo-text.png';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
        <Navbar className="bg-primary shadow-lg sticky-top" light expand="md">
          <NavbarBrand href="/"><img width="120" src={logoText} alt="Moonlight Maples Logo"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem className="pr-2">
              	<NavLink>
                  <Link to="/products">
                    <Button variant="contained">
                      Shop Products
                    </Button>
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
              	<NavLink>
                  <Link to="/about">
  	                <Button variant="outlined">
                      About Us
                    </Button>
                  </Link>  
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem className="pr-2">
              	<a class="text-dark" href="mailto:moonlightmaples@yahoo.com">
	                <Typography variant="subtitle1">
                    <i class="far fa-envelope px-2"></i>
                    moonlightmaples@yahoo.com
                  </Typography>
                </a>
              </NavItem>
              <NavItem>
              	<a class="text-dark" href="tel:8025982317">
                  <Typography variant="subtitle1">
                    <i class="fas fa-phone px-2"></i>
                    (802) 598-2317
                  </Typography>
                </a>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}