import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import TaskList from './TaskList';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot

root.render(
  <React.StrictMode>
    <TaskList />
  </React.StrictMode>
);
