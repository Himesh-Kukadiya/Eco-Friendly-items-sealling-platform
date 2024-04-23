import React from 'react';
import PropTypes from 'prop-types';
import products from '../assets/Product/product';
import Card from './Card';

const Amazon = ({ handleClick }) => {
  return (
    <section>
      {products.map(product => (
        <Card key={product.id} product={product} handleClick={handleClick} />
      ))}
    </section>
  );
};

Amazon.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default Amazon;
