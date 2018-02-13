import React from 'react';
import PropTypes from 'prop-types';

const Input = ({labelName, type, name, value, handleChange, placeholder}) => (

  <label htmlFor="owner"> {/* Should be a separate component*/}
    {labelName}
    <input 
      type={type} 
      name={name} 
      value={value} 
      onChange={handleChange}
      placeholder={placeholder}
    />
  </label>
);

export default Input; 

Input.proptypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string,
}