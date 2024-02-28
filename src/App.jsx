import { useState } from 'react';
import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';


function App() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <AddTodoForm/>
      <h1>Todo list</h1>
   <TodoList/>
    </div>
  );
}

export default App;





