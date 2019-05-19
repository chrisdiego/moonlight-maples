import React from 'react';
import {
  Container, Row, Col, Jumbotron
} from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import FeaturedProducts from './FeaturedProducts';
import image1 from './images/image1.jpg';
import image4 from './images/info-highlight.jpg';
import logo from './images/maples-logo.svg';


import './indexPage.scss';

const IndexPage = props => (
  <Container fluid className="text-center p-0">
    <Row>
      <Col className="p-0 background-image shadow mb-4">
        <Jumbotron className="w-100 py-0" style={{ backgroundColor: 'transparent' }}>
          <div>
            <Container className="rounded p-4 bg-secondary">
              <Typography component="h2" variant="h4" gutterBottom>
					Serving the Vermont region and beyond with handcrafted maple products since 1999
              </Typography>
              <hr className="my-2" />
              <Button variant="contained">Explore our Products</Button>
            </Container>
          </div>
        </Jumbotron>

        <FeaturedProducts />

      </Col>
    </Row>

    <Row>
      <Col>
        <div style={{ zIndex: '2' }} className="rounded p-4 bg-white shadow-lg intro-highlight position-relative">
          <Row>
            <Col xs={{ order: 2 }} sm={{ size: 5, offset: 2, order: 1 }}>
              <Hidden only="xs">
                <Typography variant="h4" gutterBottom>
			        Who we are
                </Typography>
              </Hidden>
              <Typography variant="body1" align="left">
	    			Maple syrup is a syrup usually made from the xylem sap of sugar maple, red maple, or black maple trees, although it can also be made from other maple species. In cold climates, these trees store starch in their trunks and roots before winter; the starch is then converted to sugar that rises in the sap in late winter and early spring. Maple trees are tapped by drilling holes into their trunks and collecting the exuded sap, which is processed by heating to evaporate much of the water, leaving the concentrated syrup.
                <br />
                <br />
	    			Maple syrup was first collected and used by the indigenous peoples of North America, and the practice was adopted by European settlers, who gradually refined production methods. Technological improvements in the 1970s further refined syrup processing. The Canadian province of Quebec is by far the largest producer, responsible for 70 percent of the world's output; Canadian exports of maple syrup in 2016 were C$ 487 million (about US$ 360 million), with Quebec accounting for some 90 percent of this total.
              </Typography>
            </Col>
            <Col xs={{ order: 1 }} sm={{ size: 3, order: 2 }}>
              <Hidden smUp>
                <Typography variant="h4" gutterBottom>
			        					Who we are
                </Typography>
              </Hidden>
              <img src={image4} width="300" className="rounded" alt="" />
              <Typography className="mt-2" variant="caption" gutterBottom>
				Robbie Morrill and Ruth Chiappinelli
                <br />
                {' '}
				Maple King & Queen, 2010
              </Typography>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

  </Container>
);

export default IndexPage;
