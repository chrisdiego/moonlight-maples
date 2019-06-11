import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import image1 from './images/image1.jpg';

const AboutPage = () => (
  <Container>
    <Row className="mb-4">
      <Col sm="12" className="about-header-image">
        <Typography component="h1" variant="h3" className="m-4">
          About Us
        </Typography>
        <img src={image1} className="mw-100" />
      </Col>
      <Col sm="9">
        <Typography component="h2" variant="h5">
						About Moonlight Maples
        </Typography>
        <Typography variant="subtitle1">
						This is a brief paragraph about the origins of Moonlight Maples, the owners of the business, how long they've been in business, and the scale of the current operation.
        </Typography>
      </Col>
      <Col sm="3" className="border-left">
        <Card className="shadow-sm mb-4">
          <CardContent>
            <Typography component="h2" variant="h5">
								Contact Us
            </Typography>
            <a className="text-dark" href="mailto:moonlightmaples@yahoo.com">
              <Typography component="p">
                <i className="far fa-envelope px-2" />
			                    moonlightmaples@yahoo.com
              </Typography>
            </a>
            <a className="text-dark" href="tel:8025982317">
              <Typography variant="subtitle1">
                <i className="fas fa-phone px-2" />
			                    (802) 598-2317
              </Typography>
            </a>
          </CardContent>
        </Card>
      </Col>
    </Row>
    <hr />
    <Row />
  </Container>
);

export default AboutPage;
