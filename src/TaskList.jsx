import React, { useState, useRef, useEffect } from 'react';
import "./App.css";
import EmptyTasksGraphic from './assets/undraw_to_do_list_re_9nt7.svg';
import TrashCanIcon from './assets/iconmonstr-trash-can-lined.svg';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const taskInputRef = useRef();

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks(prevTasks => [{ text: taskInput, checked: false }, ...prevTasks]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskToDelete) => {
    setTasks(prevTasks => prevTasks.filter(task => task !== taskToDelete));
  };

  const toggleCheck = (index) => {
    setTasks(prevTasks => prevTasks.map((task, i) => {
      if (i === index) {
        // If the task is being checked, set a timeout to delete it after 4 seconds
        if (!task.checked) {
          const taskToDelete = { ...task, checked: !task.checked };
          setTimeout(() => {
            deleteTask(taskToDelete);
          }, 4000);
          return taskToDelete;
        }
        return { ...task, checked: !task.checked };
      }
      return task;
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  useEffect(() => {
    if (taskInput === '') {
      taskInputRef.current.focus();
    }
  }, [taskInput]);

  return (
    <div className="task-list">
      <h1 className="app-title">Task List</h1>
      <div className="task-input-container">
        <input
          type="text"
          className="task-input"
          value={taskInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new task"
          ref={taskInputRef}
        />
        <button className="create-task-button" onClick={addTask}>
          Create
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleCheck(index)}
                  />
                  <span style={{ flexGrow: 1, textDecoration: task.checked ? 'line-through' : 'none' }}>{task.text}</span>
                </div>
                <div>
                  <button className="delete-task-button" onClick={() => deleteTask(index)}>
                    <img src={TrashCanIcon} alt="Delete task" style={{width: "16px", height: "16px"}} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-tasks">
          <img src={EmptyTasksGraphic} alt="No tasks" style={{width: "400px", height: "230.43px"}} />
          <p>No tasks yet!</p>
        </div>
      )}
    </div>
  );
}

export default TaskList;
