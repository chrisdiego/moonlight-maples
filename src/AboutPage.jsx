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
      <Row className="mb-4 shadow-lg">
        <Col sm="12" className="about-header-image mt-md-5 align-items-center d-flex">
          <Typography component="h1" variant="h3" className="w-100 text-center p-4 text-white">
            About Us
          </Typography>
        </Col>
      </Row>
      {aboutPageRows.map((row, i) => 
        //'alternate' swaps the order of the image/text for each row.  If it's even/0 index, image on left, if it's odd image on right
        <AboutPageRow imageSrc={row.imageSrc} imageAlt={row.imageAlt} contentTitle={row.contentTitle} contentText={row.contentText} alternate={(i % 2 == 0 || i == 0) ? true : false} />
      )}
    </div>
  );
}

export default AboutPage;
