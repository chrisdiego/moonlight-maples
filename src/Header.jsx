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
	Container
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
			isOpen: false,
			fullHeader: true
		};

		this.toggle = this.toggle.bind(this);
		this.shrinkHeader = this.shrinkHeader.bind(this);
	}

	toggle() {
	  this.setState(state => ({ isOpen: !state.isOpen }));
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
		let screenWidth = window.matchMedia("(min-width: 768px)");
		if (screenWidth.matches) {
			window.addEventListener('scroll', this.shrinkHeader);
		}
	}

	render() {
		const { 
			fullHeader,
			isOpen
		} = this.state;

		return (
			<Navbar onScroll={this.toggle} className={`bg-primary shadow-lg sticky-top header-state-${fullHeader ? 'open' : 'closed'}`} light expand="md">
				<NavbarBrand href="/" className="m-0 p-0 d-md-none">
					<img className="header-logo" src={logo} height="80vh" alt="Moonlight Maples Logo" />
				</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Container>
					<Collapse isOpen={isOpen} navbar className="justify-content-between mt-2">
						<Nav navbar>
							<NavItem className="pr-2">
								<NavLink>
									<Link to="/products" onClick={this.toggle}>
										<Button variant="contained">
												Shop Products
										</Button>
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link to="/about" onClick={this.toggle}>
										<Button variant="outlined">
												About Us
										</Button>
									</Link>
								</NavLink>
							</NavItem>
						</Nav>
						<NavbarBrand href="/" className="m-0 d-none d-md-block">
							<img className="header-logo" src={logo} alt="Moonlight Maples Logo" />
						</NavbarBrand>
						<Nav className="flex-column mr-md-5" navbar>
							<NavItem>
								<a className="text-dark" href="mailto:moonlightmaples@yahoo.com">
									<Typography variant="subtitle1">
										<FontAwesomeIcon icon="envelope" className="mx-2" size="md" />
											moonlightmaples@yahoo.com
									</Typography>
								</a>
							</NavItem>
							<NavItem>
								<a className="text-dark" href="tel:8025982317">
									<Typography variant="subtitle1" component="h1">
										<FontAwesomeIcon icon="phone" className="mx-2" size="md" />
											(802) 598-2317
									</Typography>
								</a>
							</NavItem>
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}
