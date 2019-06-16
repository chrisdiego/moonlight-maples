import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import image1 from './images/image1.jpg';

const AboutPageRow = ({imageSrc, imageAlt, contentTitle, contentText}) => (
  <Row>
    <Col sm="6" className="about-page-row-image pl-0">
      <img className="mw-100" src={imageSrc} alt={imageAlt} />
    </Col>
    <Col sm="6" className="about-page-row-content pr-0">
        <Typography component="h2" variant="h5">
          {contentTitle}
        </Typography>
        <Typography variant="subtitle1">
          {contentText}
        </Typography>
    </Col>
  </Row>
);

export default AboutPageRow;
