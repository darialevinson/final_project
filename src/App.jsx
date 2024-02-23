import { useState } from 'react';

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul> 
    </div>
  );
}

export default App;