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
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading state

  async function fetchData() {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data from Airtable API:', data);
      
      const todos = data.records.map(record => ({
        id: record.id,
        title: record.fields.title 
      }));
      console.log('Todos:', todos);

      setTodoList(todos);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('Error message:', error.message);
    } finally {
      setIsLoading(false); // Set isLoading to false when the fetch is complete
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
      {isLoading ? ( // Render loading message if isLoading is true
        <div>Loading...</div>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
}

export default App;
