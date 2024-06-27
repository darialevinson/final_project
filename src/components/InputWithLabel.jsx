import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const InputWithLabel = ({ inputRef, children, todoTitle, handleTitleChange }) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
}, []); 

  return (
  <div style={{ flex: 1 }}>
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
  inputRef: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
};


export default InputWithLabel;
