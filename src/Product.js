import React from 'react';
import {
	Card, CardTitle, CardSubtitle, CardBody, CardText, CardImg,
} from 'reactstrap';
import Button from '@material-ui/core/Button';

const Product = ({product, size, featured}) => {
	return (
		<Card className="shadow-md mb-3 rounded text-center">
			<CardImg top width="100%" src={product.mainImage} alt="Maple Syrup" />
			<CardBody>
				<CardTitle>{product.name}</CardTitle>
				<CardSubtitle>${size.price}</CardSubtitle>
				<CardText>{size.quantity}</CardText>
				<Button variant="contained">View</Button>
			</CardBody>
		</Card>
	);
}

export default Product