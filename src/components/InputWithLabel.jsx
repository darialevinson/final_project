import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ inputRef, children, todoTitle, handleTitleChange }) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
}, [inputRef]); 

  return (
    <div>
      <label htmlFor="todoTitle">{children}</label>
      <input
        ref={inputRef}
        id="todoTitle"
        type="text"
        name="todoTitle"
        placeholder=""
        value={todoTitle}
        onChange={handleTitleChange}  
      />
    </div>
  );
};

InputWithLabel.propTypes = {
  handleTitleChange: PropTypes.func,
};

export default InputWithLabel;
