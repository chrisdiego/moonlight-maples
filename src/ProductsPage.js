import React from 'react';
import { Container, Row, Col } from 'reactstrap';
//import ProductsFilters from './ProductsFilters';
//import ProductsList from './ProductsList';

const ProductsPage = () => {
  return (
    <div className="container-1600">
      <ProductsFilters />
      <ProductsList />
    </div>
  );
}

export default ProductsPage;
