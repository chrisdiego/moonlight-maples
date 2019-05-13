import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Typography from '@material-ui/core/Typography';

const LinkList = props => (
  <div>
    <Typography className="mb-2" variant="subtitle1">
      {props.subtitle}
    </Typography>
    <ListGroup flush>
      <Typography variant="subtitle2">
        {props.footerLinks.map(link => (
          <ListGroupItem tag="a" className="bg-secondary">
            {link.iconClasses ? <i className={link.iconClasses} /> : null }
            {link.label}
          </ListGroupItem>
        ))
    }
      </Typography>
    </ListGroup>
  </div>
);

export default LinkList;
