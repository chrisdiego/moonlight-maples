import React from 'react';
import { Col, Row } from 'reactstrap';
import Product from './Product';

const ProductsList = ({products}) => {
	return (
		<Col sm="10" className="my-4 products-list"> 
			<Row>
				{products.map(product => 
					product.sizes.map(size =>
						<Col sm="3">
							<Product product={product} size={size} />
						</Col>
					)
				)}
				</Row>
		</Col>
	);
};

export default ProductsList;