// src/components/ToDoList.js
import React, { useState, useEffect, useRef } from 'react';
import ToDoItem from './ToDoItem';
import './ToDoList.css';

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
      setSelectedIndex(-1); // Keep the input field selected after adding a new item
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
      if (selectedIndex === 0) inputRef.current.focus();
    } else if (event.key === 'ArrowDown') {
      setSelectedIndex((prevIndex) => (prevIndex < todos.length - 1 ? prevIndex + 1 : prevIndex));
    } else if (event.key === 'Delete' && selectedIndex >= 0) {
      deleteTodo(selectedIndex);
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setSelectedIndex((prevIndex) => (prevIndex >= newTodos.length ? newTodos.length - 1 : prevIndex));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, todos]);

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        ref={inputRef}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={selectedIndex === -1 ? handleKeyPress : null} // Disable typing in input when an item is selected
        className={selectedIndex === -1 ? 'selected' : ''}
        placeholder="Add a new task..."
        readOnly={selectedIndex !== -1} // Make the input read-only when an item is selected
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <ToDoItem
            key={index}
            index={index}
            todo={todo}
            selected={index === selectedIndex}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
