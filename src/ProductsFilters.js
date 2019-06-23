import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Row, Col, InputGroup, InputGroupAddon, Input, InputGroupText } from 'reactstrap';

const ProductsFilters = ({updateProducts, products, filters, updateField}) => {
	return (
		<Col sm="2" className="my-4 products-filters border-right">
			<Row className="mb-4">
				<Col sm="12">
					<Typography component="h5" variant="h5" gutterBottom>Price</Typography>
				</Col>
				<Col sm="6">
					<InputGroup>
							<InputGroupAddon addonType="prepend">$</InputGroupAddon>
							<Input type="number" placeholder="Min"></Input>
					</InputGroup>	
				</Col>
				<Col sm="6">
					<InputGroup>
							<InputGroupAddon addonType="prepend">$</InputGroupAddon>
							<Input type="number" placeholder="Max" name="maxPrice" onChange={updateField} value={filters.maxPrice}></Input>
					</InputGroup>
				</Col>
			</Row>
			<Row>
				<Col sm="12">
					<Typography component="h5" variant="h5" gutterBottom>Type</Typography>
				</Col>				
				{products.map(product => {
						return (
							<Col sm="12">
							<input type="checkbox" checked={filters.types.includes(product.name)} onChange={updateField} name={product.name} className="mr-2"></input>
							<label>{product.name}</label>
							</Col>
						);
					}
				)}
			</Row>
		</Col>
	);
}

export default ProductsFilters;