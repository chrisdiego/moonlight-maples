import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ProductsFilters from './ProductsFilters';
import ProductsList from './ProductsList';
import allProducts from './content/products';

const ProductsPage = () => {
	const [products, updateProducts] = useState(allProducts);
	const [filters, updateFilters] = useState({
		minPrice: 0,
		maxPrice: 999,
		types: allProducts.map(product => product.name)
	});
	//useEffect(() => 
		//api call here to s3 here to get products information
	//)

	const refineProducts = filters => {
		//price filter
		//type filter

	}

	const updateField = e => {
		updateFilters({
			...filters,
			[e.target.name]: e.target.value
		})
		refineProducts(filters);
		console.log(filters);
	}

  return (
    <div className="container-1600">
    	<Row>
     		 <ProductsFilters products={products} filters={filters} updateField={updateField} updateProducts={updateProducts}/>
     		 <ProductsList products={products} />
     	</Row>
    </div>
  );
}

export default ProductsPage;
