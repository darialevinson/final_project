import TodoList from './TodoList'

function TodoListItem({ todo }) {
    return (
     <ul>
         <li>
        {todo.id} - {todo.title}
      </li>
     </ul>
    );
  }
export default TodoListItem