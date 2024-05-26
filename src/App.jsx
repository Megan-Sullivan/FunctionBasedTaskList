import React from 'react';
import './App.css';
import TaskList from './Tasklist';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <TaskList />
      </div>
    );
  }
}

export default App;
