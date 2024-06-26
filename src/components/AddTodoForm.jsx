import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  const inputRef = useRef(null);

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle, 
      id: Date.now(), 
    };
    onAddTodo(newTodo);
    setTodoTitle(''); 
    inputRef.current.focus(); 
  };

  return (
    <form onSubmit={handleAddTodo} style={{ display: 'flex' }}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        inputRef={inputRef}
      >
        Add new todo
      </InputWithLabel>
      <button type="submit">Submit</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
