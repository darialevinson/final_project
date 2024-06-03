import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo }) { 
  const handleRemoveClick = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className={style.ListItem}>
      {todo.title}
      <button type="button" onClick={handleRemoveClick}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  handleRemoveClick: PropTypes.func,
};

export default TodoListItem;
