import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Typography from '@material-ui/core/Typography'
import LinkList from './LinkList';

import { sitemapLinks, contactLinks } from './content/linksLists.js';

const Footer = () => (
  <Container fluid className="bg-secondary p-4 shadow-lg text-center">
    <Row>
      <Col sm={{ offset: 3, size: 3} }> 
        <LinkList footerLinks={sitemapLinks} subtitle="Sitemap" />
      </Col>
      <Col sm={{ size: 3 }}> 
        <LinkList footerLinks={contactLinks} subtitle="Contact" />
      </Col>
    </Row>
    <Row>
      <Col>
        <Typography variant="body1">
          © 2018 Moonlight Maples, all rights reserved <br />
          Site by Chris Diego
        </Typography>
      </Col>
    </Row>
  </Container>
)

export default Footer;