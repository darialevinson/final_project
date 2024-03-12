import React, { useState } from 'react';
import TodoListItem from './TodoListItem';



const todoList = [
  {
    id: 1,
    title: "To install React-app"
  },
  {
    id: 2,
    title: "To read a book"
  },
  {
    id: 3,
    title: "Complete assignment"
  }
];

function TodoList() {
  return (
    <div>
      <h1>List todo</h1>
      <ul>
        {todoList.map((object, i) => <TodoListItem todo={object} />)}
      </ul>      
    </div>
  )
}

export default TodoList;