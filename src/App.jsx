import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

function App({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tableName) return;

    const fetchData = async () => {
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`;

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

        data.records.sort((objectA, objectB) => {
          const titleA = objectA.fields.title; 
          const titleB = objectB.fields.title;
          
          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        });

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
  }, [tableName]); 

  useEffect(() => {
    if (!isLoading && todoList.length > 0) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  async function addTodo(title) {
    if (!tableName) return;

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}`;
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          title: title.title.trim()
        }
      })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newTodo = await response.json();
      const addedTodo = {
        id: newTodo.id,
        title: newTodo.fields.title
      };

      setTodoList(prevTodoList => {
        const updatedList = [...prevTodoList, addedTodo];
        return updatedList.sort((a, b) => a.title.localeCompare(b.title));
      });
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(error);
    }
  }

  async function removeTodo(id) {
    if (!tableName) return;

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${tableName}/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error removing todo:', error);
      setError(error);
    }
  }

  return (
    <BrowserRouter>
     <div className="container">
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Home</Link></li>
          <li className="nav-item"><Link to="/todolist">Todo List</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/todolist" element={
          <div>
            {tableName && <h1>{tableName} Table</h1>}
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
              <p>Loading...</p> 
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
          </div>
        } />
        <Route path="/" element={
          <div>
            <p>Welcome to my website!</p>
            <img src="https://images.pexels.com/photos/2736499/pexels-photo-2736499.jpeg" width="400" height="267"/>
          </div>
          } />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

App.propTypes = {
  tableName: PropTypes.string
};

App.defaultProps = {
  tableName: 'Default'
};

export default App;
