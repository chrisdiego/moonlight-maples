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
import { CSSTransitionGroup } from 'react-transition-group'
import logoText from './images/logo-text.png';
import logo from './images/maples-logo.svg';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: true,
			fullHeader: true
		};

		this.toggle = this.toggle.bind(this);
		this.shrinkHeader = this.shrinkHeader.bind(this);
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

	shrinkHeader() {
		const distFromTop = window.pageYOffset,
			navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight;

		if (distFromTop > navbarHeight) {
			this.setState({
				fullHeader: false
			});
		} else {
			this.setState({
				fullHeader: true
			});
		}
	}

	componentDidMount() {
	    window.addEventListener('scroll', this.shrinkHeader);
	}

	render() {
		const { 
			fullHeader,
			isOpen
		} = this.state;

		return (
			<Navbar onScroll={this.toggle} className={`bg-primary shadow-lg sticky-top header-state-${fullHeader ? 'open' : 'closed'}`} light expand="md">
				<NavbarBrand href="/">
					<img width="120" className="header-logo-sub header-logo" src={logo} alt="Moonlight Maples Logo" />
				</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={isOpen} navbar>
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
						<img width="200" className="header-logo header-logo-main" src={logo} alt="Moonlight Maples Logo" />
					</Nav>
					<Nav className="ml-auto" navbar>
						<NavItem className="pr-2">
							<a className="text-dark" href="mailto:moonlightmaples@yahoo.com">
								<Typography variant="subtitle1">
									<FontAwesomeIcon icon="envelope" className="mx-2" size="lg" />
										moonlightmaples@yahoo.com
								</Typography>
							</a>
						</NavItem>
						<NavItem>
							<a className="text-dark" href="tel:8025982317">
								<Typography variant="subtitle1">
									<FontAwesomeIcon icon="phone" className="mx-2" size="lg" />
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
