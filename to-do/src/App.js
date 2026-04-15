import React from 'react';
import TaskList from './components/TaskList';
import './styles.css';

function App() {
  return (
    <div className="container">
      <header>
        <h1>Designer To-Do List</h1>
        <p className="subtitle">Организуйте свои дизайн-проекты и задачи</p>
      </header>
      <TaskList />
    </div>
  );
}

export default App;