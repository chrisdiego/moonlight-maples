import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const AboutPage = (props) => {
	return (
		<Container>
			<Row className="mb-4">
				<Col sm="12">
					<Typography component="h1" variant="h3" className="m-4">
						About Us
					</Typography>
				</Col>
				<Col sm="9">
					<Typography component="h2" variant="h5">
					Where to find us
					</Typography>
					<Typography variant="subtitle1">
						Our store front is located in Georgia, Vermont.  Use the tool below to find directions!
					</Typography>
					<div>
				      <iframe width="100%" height="300" frameborder="0" src="https://www.google.com/maps/embed/v1/search?key=AIzaSyCPo3CUHJk83mZtsFGUWb8c_Ps2QBIvD9k&q=1177+Sand+Hill+Rd,+Milton,+VT+05468" allowFullScreen></iframe>
				    </div>
				</Col>
				<Col sm="3" className="border-left">
					<Card className="shadow-sm mb-4">
						<CardContent>
							<Typography component="h2" variant="h5">
								Contact Us
							</Typography>
							<a class="text-dark" href="mailto:moonlightmaples@yahoo.com">
				                <Typography component="p">
			                    <i class="far fa-envelope px-2"></i>
			                    moonlightmaples@yahoo.com
			                  </Typography>
			                </a>
			                <a class="text-dark" href="tel:8025982317">
			                  <Typography variant="subtitle1">
			                    <i class="fas fa-phone px-2"></i>
			                    (802) 598-2317
			                  </Typography>
			                </a>
						</CardContent>
					</Card>
				</Col> 
			</Row>
			<hr />
			<Row> 
				
			</Row>
		</Container>
	);
};

export default AboutPage;