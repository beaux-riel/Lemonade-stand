import React from 'react';
import PropTypes from 'prop-types';

/**
 * Form component with child-friendly styling
 */
const Form = ({ children, onSubmit, className = '', ...props }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`space-y-4 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
};

/**
 * Form Group component for grouping form elements
 */
const FormGroup = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Form Label component
 */
const FormLabel = ({ children, htmlFor, required = false, className = '', ...props }) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`block mb-2 font-display text-lemonade-blue-dark ${className}`}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-lemonade-pink-dark">*</span>}
    </label>
  );
};

FormLabel.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Input component with child-friendly styling
 */
const Input = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  error = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-2 transition-colors duration-200 bg-white border rounded-lg focus:outline-none focus:ring-2';
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-lemonade-blue focus:ring-lemonade-blue-light';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  return (
    <div className="w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

/**
 * Textarea component with child-friendly styling
 */
const Textarea = ({
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  disabled = false,
  required = false,
  className = '',
  error = '',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-2 transition-colors duration-200 bg-white border rounded-lg focus:outline-none focus:ring-2';
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-lemonade-blue focus:ring-lemonade-blue-light';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  return (
    <div className="w-full">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

/**
 * Select component with child-friendly styling
 */
const Select = ({
  id,
  options = [],
  value,
  onChange,
  disabled = false,
  required = false,
  className = '',
  error = '',
  placeholder = 'Select an option',
  ...props
}) => {
  const baseClasses = 'w-full px-4 py-2 transition-colors duration-200 bg-white border rounded-lg focus:outline-none focus:ring-2 appearance-none';
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-gray-300 focus:border-lemonade-blue focus:ring-lemonade-blue-light';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
  
  return (
    <div className="w-full relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

/**
 * Checkbox component with child-friendly styling
 */
const Checkbox = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-5 h-5 text-lemonade-yellow border-gray-300 rounded focus:ring-lemonade-yellow-dark"
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 text-gray-700 cursor-pointer"
        >
          {label}
          {required && <span className="ml-1 text-lemonade-pink-dark">*</span>}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Radio component with child-friendly styling
 */
const Radio = ({
  id,
  name,
  label,
  value,
  checked,
  onChange,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-5 h-5 text-lemonade-yellow border-gray-300 focus:ring-lemonade-yellow-dark"
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 text-gray-700 cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
};

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
};

// Export all components
Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Input = Input;
Form.Textarea = Textarea;
Form.Select = Select;
Form.Checkbox = Checkbox;
Form.Radio = Radio;

export default Form;