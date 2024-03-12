import React from 'react';

function AddTodoForm({ onAddTodo }) {
  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target.elements.todoTitle.value;
    onAddTodo(todoTitle);
    event.target.reset();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title</label>
      <input id="todoTitle" type="text" name="todoTitle" placeholder="Enter case title" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTodoForm;