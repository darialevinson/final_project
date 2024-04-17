import React, { useRef, useEffect } from 'react';

const InputWithLabel = ({ children, todoTitle, handleTitleChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    
    inputRef.current.focus();
  }, [todoTitle]); 

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

export default InputWithLabel;
