import React, { useState, useRef, useEffect } from 'react';
import './Todo.css';
import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  const addTodo = () => {
    if (todo.trim() !== '') {
      if (editId) {
        // Edit existing todo
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        setTodos(updatedTodos);
        setEditID(0);
      } else {
        // Add new todo
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo('');
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    alert('Deleted');
  };

  const onComplete = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setTodos(updatedTodos);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className='container'>
      <form className='form-group' onSubmit={handleSubmit}>
        <h1>TODO APP</h1>
        <input
          type='text'
          value={todo}
          ref={inputRef}
          placeholder='whats in your mind'
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className='btn' type='submit'>
          {editId ? 'EDIT' : 'CREATE'}
        </button>
      </form>
      <div className='list'>
        <ul>
          {todos.map((todo) => (
            <li className='list-items' key={todo.id}>
              <div className='list-item-list' id={todo.status ? 'list-item' : ''}>
                {todo.list}
              </div>
              <span>
                <IoMdDoneAll
                  className='list-item-icons'
                  id='complete'
                  title='Complete'
                  onClick={() => onComplete(todo.id)}
                />
                <FiEdit
                  className='list-item-icons'
                  id='edit'
                  title='Edit'
                  onClick={() => onEdit(todo.id)}
                />
                <MdDelete
                  className='list-item-icons'
                  id='delete'
                  title='Delete'
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
