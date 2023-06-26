import React, { useState } from 'react';
import './TodoList.css';
import { FiEdit } from 'react-icons/fi';
import { AiFillDelete } from 'react-icons/ai';
import { MdAddCircle } from 'react-icons/md';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    removeFromCompletedTasks(index);
  };

  const startEditing = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const cancelEditing = () => {
    setEditIndex(-1);
    setEditValue('');
  };

  const saveEdit = (index) => {
    if (editValue.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[index] = editValue;
      setTodos(updatedTodos);
      setEditIndex(-1);
      setEditValue('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    if (updatedCompletedTasks.includes(index)) {
      removeFromCompletedTasks(index);
    } else {
      updatedCompletedTasks.push(index);
      setCompletedTasks(updatedCompletedTasks);
    }
  };

  const removeFromCompletedTasks = (index) => {
    const updatedCompletedTasks = completedTasks.filter((taskIndex) => taskIndex !== index);
    setCompletedTasks(updatedCompletedTasks);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setCompletedTasks([]);
    } else {
      const allTasks = todos.map((_, index) => index);
      setCompletedTasks(allTasks);
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className='container'>
     
      <div className='todo-list-container'>
        <h1>Todo-List</h1>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <div className='add'>
          <button onClick={addTodo}><MdAddCircle /></button>
        </div>
        <li className='tl'>
          <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
          <label htmlFor="selectAll">Select All</label>
        </li>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <li key={index} className={completedTasks.includes(index) ? 'completed' : ''}>
              <input type="checkbox" checked={completedTasks.includes(index)} onChange={() => toggleTaskCompletion(index)} />
              {index === editIndex ? (
                <>
                  <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                  <button onClick={() => saveEdit(index)}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      textDecoration: completedTasks.includes(index) ? 'line-through' : 'none',
                    }}
                  >
                    {todo}
                  </span>
                  <button onClick={() => startEditing(index, todo)} className="edit-button"><FiEdit /></button>
                  <button onClick={() => removeTodo(index)}><AiFillDelete /></button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
