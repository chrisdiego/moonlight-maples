import React from 'react';
import {
	Row, Col, Card, CardTitle, CardSubtitle, CardBody, CardText, CardImg,
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import products from './content/products';

const featuredProducts = () => {
	return (
		<Row className="mb-4 featured-products mx-auto"> 
			{products.map(product => {
				return (
					product.featured ?
						<Col sm="3">
							<Card className="shadow-md mb-3 rounded">
								<CardImg top width="100%" src={product.mainImage} alt="Maple Syrup" />
								<CardBody>
									<CardTitle>{product.name}</CardTitle>
									<CardSubtitle>???</CardSubtitle>
									<CardText>{product.description}</CardText>
									<Button variant="contained">View</Button>
								</CardBody>
							</Card>
						</Col> :
					null
				);
				}
			)}
		</Row>
	);
};

export default featuredProducts;