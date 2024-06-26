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
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
