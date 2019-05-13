import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import logoText from './images/logo-text.png';
import logo from './images/maples-logo.svg';


export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle(screen) {
		console.log(screen.scrollTop);
		if(screen.scrollTop==0){
		  this.setState({
				isOpen: true,
			});
		} else {
			this.setState({
				isOpen: false,
			});
		}
	}

	componentDidMount() {
			let screen = document.getElementsByClassName('App');
	    window.addEventListener('scroll', this.toggle(screen));
	}

	render() {
		return (
			<Navbar onScroll={this.toggle} className="bg-primary shadow-lg sticky-top" light expand="md">
				<NavbarBrand href="/">
					{this.state.isOpen ? null : <img width="200" src={logo} alt="Moonlight Maples Logo" /> }
				</NavbarBrand>
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
					<Nav className="m-auto" navbar>
						{this.state.isOpen ? <img width="200" src={logo} alt="Moonlight Maples Logo" /> : null}
					</Nav>
					<Nav className="ml-auto" navbar>
						<NavItem className="pr-2">
							<a className="text-dark" href="mailto:moonlightmaples@yahoo.com">
								<Typography variant="subtitle1">
									<i className="far fa-envelope px-2" />
										moonlightmaples@yahoo.com
								</Typography>
							</a>
						</NavItem>
						<NavItem>
							<a className="text-dark" href="tel:8025982317">
								<Typography variant="subtitle1">
									<i className="fas fa-phone px-2" />
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
