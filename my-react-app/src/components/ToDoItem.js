// src/components/ToDoItem.js
import React from 'react';
import './ToDoItem.css';

const ToDoItem = ({ todo, index, selected, toggleTodo, deleteTodo }) => {
  return (
    <li className={`todo-item ${selected ? 'selected' : ''}`}>
      <span onClick={() => toggleTodo(index)}>{todo.text}</span>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
