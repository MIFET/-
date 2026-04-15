import React, { useState } from 'react';
import { useGetTasksQuery } from '../features/tasks/tasksApi';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const { data: tasks = [], isLoading, isError } = useGetTasksQuery(filter);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    alert(`Редактирование задачи: ${task.title}\n(в реальном проекте открыть форму с данными)`);
  };

  if (isLoading) return <div className="empty-state">Загрузка задач...</div>;
  if (isError) return <div className="empty-state">Ошибка загрузки задач</div>;

  return (
    <>
      <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
      <section className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Все задачи
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Завершенные
        </button>
      </section>
      <section className="task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%236c5ce7'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z'/%3E%3C/svg%3E"
              alt="No tasks"
            />
            <h3>Нет задач</h3>
            <p>{filter === 'all' ? 'Добавьте свою первую задачу' : 'Нет задач по выбранному фильтру'}</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskItem key={task.id} task={task} onEdit={handleEdit} />
          ))
        )}
      </section>
    </>
  );
};

export default TaskList;