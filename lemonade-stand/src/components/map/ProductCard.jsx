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
      <div className="flex flex-col sm:flex-row">
        {product.image_url && (
          <div className="sm:w-1/3 flex-shrink-0">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-28 sm:h-32 md:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />
          </div>
        )}

        <div className={`p-3 sm:p-4 flex-1 ${!product.image_url ? 'sm:w-full' : 'sm:w-2/3'}`}>
          <div className="flex justify-between items-start mb-1 sm:mb-2">
            <h3 className="text-base sm:text-lg font-display text-lemonade-blue-dark truncate max-w-[70%]">{product.name}</h3>
            <Badge variant="yellow" className="ml-2 text-xs sm:text-sm whitespace-nowrap">${parseFloat(product.price).toFixed(2)}</Badge>
          </div>

          {product.description && (
            <p className="text-gray-700 text-xs sm:text-sm line-clamp-3">{product.description}</p>
          )}

          <div className="flex justify-between items-center mt-2">
            {product.is_available === false ? (
              <Badge variant="red" className="text-xs">Sold Out</Badge>
            ) : (
              <Badge variant="green" className="text-xs">Available</Badge>
            )}

          </div>
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