
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  // Define the custom hook within the App component
  function useSemiPersistentState(key, initialState) {
    const [state, setState] = useState(
      localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialState
    );

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState]; // Returning state variable and setter as an Array
  }

  // Use the custom hook
  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);

  function addTodo(newTodo) {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;
