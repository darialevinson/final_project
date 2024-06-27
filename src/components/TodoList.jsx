import React from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';
import PropTypes from 'prop-types';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className={styles.TodoListContainer}>
      <h1 className={styles.Title}>Todo List</h1>
      <ul>
        {todoList.map(todo => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
