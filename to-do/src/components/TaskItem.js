import React from 'react';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../features/tasks/tasksApi';

const priorityText = { high: 'Высокий', medium: 'Средний', low: 'Низкий' };
const categoryNames = {
  'ui-design': 'UI Дизайн',
  'ux-research': 'UX Исследование',
  'branding': 'Брендинг',
  'illustration': 'Иллюстрация',
  'prototyping': 'Прототипирование',
  'other': 'Другое',
};

const TaskItem = ({ task, onEdit }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const toggleComplete = () => {
    updateTask({ id: task.id, updates: { completed: !task.completed } });
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены?')) {
      deleteTask(task.id);
    }
  };

  const dueDateText = task.dueDate ? new Date(task.dueDate).toLocaleDateString('ru-RU') : '';

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-description">{task.description}</div>}
        <div className="task-meta">
          <span className={`task-priority priority-${task.priority}`}>
            {priorityText[task.priority]}
          </span>
          <span className="task-category">{categoryNames[task.category]}</span>
          {dueDateText && <span className="task-due-date">{dueDateText}</span>}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>✏️</button>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default TaskItem;