import React from 'react';
import { Row, Col } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import image1 from './images/image1.jpg';

const AboutPageRow = ({imageSrc, imageAlt, contentTitle, contentText, alternate}) => (
  <Row className="mb-5">
    <Col sm={{size: 6, order: alternate ? 1 : 2}} className="about-page-row-image p-0 pr-md-5">
      <img className="mw-100 shadow-md" src={imageSrc} alt={imageAlt} />
    </Col>
    <Col sm={{size: 6, order: alternate ? 2 : 1}} className="about-page-row-content p-0 pl-md-5">
        <Typography component="h2" variant="h5">
          {contentTitle}
        </Typography>
        <Typography variant="subtitle1">
          {contentText}
        </Typography>
    </Col>
    <hr />
  </Row>
);

export default AboutPageRow;
