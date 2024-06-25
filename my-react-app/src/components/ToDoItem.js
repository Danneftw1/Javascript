// src/components/ToDoItem.js
import React from 'react';
import './ToDoItem.css';

const ToDoItem = ({ todo, index, selected, toggleTodo, deleteTodo, toggleTodoCompleted }) => {
  return (
    <li className={`todo-item ${selected ? 'selected' : ''} ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTodoCompleted(index)}>{todo.text}</span>
      {todo.completed && <span className="checkmark">✔️</span>}
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
};

export default ToDoItem;