import React from 'react';
import "./App.css";
import EmptyTasksGraphic from './assets/undraw_to_do_list_re_9nt7.svg';
import TrashCanIcon from './assets/iconmonstr-trash-can-lined.svg';

  class TaskList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tasks: [],
        taskInput: ''
      };
      this.taskInputRef = React.createRef();
    }
  
    handleInputChange = (e) => {
      this.setState({ taskInput: e.target.value });
    };
  
    addTask = () => {
      if (this.state.taskInput.trim() !== '') {
        this.setState(prevState => ({
          tasks: [{ text: this.state.taskInput, checked: false }, ...prevState.tasks],
          taskInput: ''
        }), () => {
          this.taskInputRef.current.focus(); // Focus the input box after state update
        });
      }
    };
  
    deleteTask = (index) => {
        // Create a copy of the tasks array
        const tasksCopy = [...this.state.tasks];
      
        // Only delete the task if it is checked
        if (tasksCopy[index].checked) {
          tasksCopy.splice(index, 1);
      
          // Update the state with the new tasks array
          this.setState({ tasks: tasksCopy });
        }
      };
      
  
    toggleCheck = (index) => {
      this.setState(prevState => {
        const tasks = [...prevState.tasks];
        tasks[index] = { ...tasks[index], checked: !tasks[index].checked };
        return { tasks };
      });
    };
  
    handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.addTask();
      }
    };
  
    render() {
      const { tasks, taskInput } = this.state;
      return (
        <div className="task-list">
           <h1 className="app-title">Task List</h1>
          <div className="task-input-container">
            <input
              type="text"
              className="task-input"
              value={taskInput}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              placeholder="Enter a new task"
              ref={this.taskInputRef}
            />
            <button className="create-task-button" onClick={this.addTask}>
              Create
            </button>
          </div>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task, index) => {
                // If the task is checked, set a timeout to delete it after 4 seconds
                if (task.checked) {
                  setTimeout(() => {
                    this.deleteTask(index);
                  }, 4000);
                }
                return (
                  <li key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type="checkbox"
                          checked={task.checked}
                          onChange={() => this.toggleCheck(index)}
                        />
                        <span style={{ flexGrow: 1, textDecoration: task.checked ? 'line-through' : 'none' }}>{task.text}</span>
                      </div>
                      <div>
                        <button className="delete-task-button" onClick={() => this.deleteTask(index)}>
                          <img src={TrashCanIcon} alt="Delete task" style={{width: "16px", height: "16px"}} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
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
  }
  
  export default TaskList;
  