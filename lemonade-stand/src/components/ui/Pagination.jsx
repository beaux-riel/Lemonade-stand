import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pagination component with child-friendly styling
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range around current page
    const leftSiblingIndex = Math.max(2, currentPage - siblingCount);
    const rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingCount);
    
    // Add dots indicator or page numbers
    if (leftSiblingIndex > 2) {
      pageNumbers.push('...');
    } else if (leftSiblingIndex === 2) {
      pageNumbers.push(2);
    }
    
    // Add pages between left and right siblings
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Add dots indicator or page numbers
    if (rightSiblingIndex < totalPages - 1) {
      pageNumbers.push('...');
    } else if (rightSiblingIndex === totalPages - 1) {
      pageNumbers.push(totalPages - 1);
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };
  
  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
    yellow: 'bg-white border border-lemonade-yellow text-gray-700 hover:bg-lemonade-yellow-light',
    blue: 'bg-white border border-lemonade-blue text-gray-700 hover:bg-lemonade-blue-light',
    pink: 'bg-white border border-lemonade-pink text-gray-700 hover:bg-lemonade-pink-light',
  };
  
  // Active page classes
  const activeClasses = {
    default: 'bg-lemonade-yellow text-gray-800 border-lemonade-yellow',
    yellow: 'bg-lemonade-yellow text-gray-800 border-lemonade-yellow',
    blue: 'bg-lemonade-blue text-white border-lemonade-blue',
    pink: 'bg-lemonade-pink text-white border-lemonade-pink',
  };
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  // Page numbers to display
  const pageNumbers = getPageNumbers();
  
  return (
    <nav
      className={`flex items-center justify-center ${className}`}
      aria-label="Pagination"
      {...props}
    >
      <ul className="flex items-center space-x-2">
        {/* Previous button */}
        <li>
          <button
            className={`
              ${sizeClasses[size]}
              rounded-full flex items-center justify-center
              ${currentPage === 1 ? disabledClasses : variantClasses[variant]}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonade-yellow
            `}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-2">...</span>
            ) : (
              <button
                className={`
                  ${sizeClasses[size]}
                  rounded-full flex items-center justify-center font-display
                  ${page === currentPage ? activeClasses[variant] : variantClasses[variant]}
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonade-yellow
                `}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <button
            className={`
              ${sizeClasses[size]}
              rounded-full flex items-center justify-center
              ${currentPage === totalPages ? disabledClasses : variantClasses[variant]}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lemonade-yellow
            `}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'yellow', 'blue', 'pink']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Pagination;