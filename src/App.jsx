import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState(key, initialState) {
  const [state, setState] = useState(
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : initialState
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState('savedTodoList', []);

  function addTodo(newTodo) {
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
  }

  function removeTodo(idToRemove) {
    const updatedTodoList = todoList.filter(todo => todo.id !== idToRemove);
    setTodoList(updatedTodoList);
  }

  return (
    <div>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />

    </div>
  );
}

export default App;
