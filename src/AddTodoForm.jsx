import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ addTodo }) {
  const [todoTitle, setTodoTitle] = useState('');
  

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };
    addTodo(newTodo);
    setTodoTitle('');
  }

  return (
    <form onSubmit={handleAddTodo} style={{ display: 'flex' }}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Title
      </InputWithLabel>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTodoForm;
