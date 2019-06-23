import React from 'react';
import {
	Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardText, CardImg,
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Product from './Product';
import products from './content/products';

const featuredProducts = () => {
	return (
		<Row className="mb-4 featured-products mx-auto"> 
				{products.map(product => 
					product.sizes.filter(x => x.featured).map(size =>
						<Col sm="3">
							<Product product={product} size={size} />
						</Col>
					)
				)}
		</Row>
	);
};

export default featuredProducts;