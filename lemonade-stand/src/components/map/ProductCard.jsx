import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge } from '../ui';

/**
 * ProductCard component for displaying product information
 */
const ProductCard = ({ product, className = '', ...props }) => {
  if (!product) return null;

  return (
    <Card
      className={`w-full ${className}`}
      variant="white"
      hover={false}
      {...props}
    >
      <div className="flex flex-col md:flex-row">
        {product.image_url && (
          <div className="md:w-1/3">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-32 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            />
          </div>
        )}

        <div className={`p-4 flex-1 ${!product.image_url ? 'md:w-full' : 'md:w-2/3'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-display text-lemonade-blue-dark">{product.name}</h3>
            <Badge variant="yellow" className="ml-2">${parseFloat(product.price).toFixed(2)}</Badge>
          </div>

          {product.description && (
            <p className="text-gray-700 text-sm">{product.description}</p>
          )}

          {product.is_available === false && (
            <Badge variant="red" className="mt-2">Sold Out</Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    image_url: PropTypes.string,
    is_available: PropTypes.bool
  }).isRequired,
  className: PropTypes.string
};

export default ProductCard;