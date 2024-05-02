import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        const todos = data.records.map(record => ({
          id: record.id,
          title: record.fields.title 
        }));
        setTodoList(todos);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency list

  useEffect(() => {
    if (!isLoading && todoList.length > 0) { // Only save to localStorage if todoList is not empty
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
}

export default App;
