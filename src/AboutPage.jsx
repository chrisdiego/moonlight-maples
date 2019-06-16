import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AboutPageRow from './AboutPageRow';
import image1 from './images/image1.jpg';
import './AboutPage.scss';
import aboutPageRows from './content/aboutPageRows';

const AboutPage = () => {
  return (
    <div className="container-1600">
      <Row className="mb-4">
        <Col sm="12" className="about-header-image mt-5 align-items-center d-flex">
          <Typography component="h1" variant="h3" className="w-100 text-center p-4 text-white">
            About Us
          </Typography>
        </Col>
      </Row>
      {aboutPageRows.map(row => 
        <AboutPageRow imageSrc={row.imageSrc} imageAlt={row.imageAlt} contentTitle={row.contentTitle} contentText={row.contentText} />
      )}
    </div>
  );
}

export default AboutPage;
