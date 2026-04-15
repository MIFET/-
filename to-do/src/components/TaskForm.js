import React, { useState } from 'react';
import { useAddTaskMutation } from '../features/tasks/tasksApi';

const categoryOptions = [
  { value: 'ui-design', label: 'UI Дизайн' },
  { value: 'ux-research', label: 'UX Исследование' },
  { value: 'branding', label: 'Брендинг' },
  { value: 'illustration', label: 'Иллюстрация' },
  { value: 'prototyping', label: 'Прототипирование' },
  { value: 'other', label: 'Другое' },
];

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('ui-design');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [addTask, { isLoading }] = useAddTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask({ title, description, category, priority, dueDate });
    setTitle('');
    setDescription('');
    setCategory('ui-design');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <section className="task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название задачи</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Создать логотип для клиента"
            required
          />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Детали задачи..."
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Категория</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Приоритет</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </select>
          </div>
          <div className="form-group">
            <label>Срок выполнения</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Добавление...' : 'Добавить задачу'}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;