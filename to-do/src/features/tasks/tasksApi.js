import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Имитация базы данных
let nextId = 5;
let tasks = [
  { id: 1, title: 'Создать логотип', description: 'Для клиента X', category: 'branding', priority: 'high', dueDate: '2025-05-01', completed: false },
  { id: 2, title: 'Прототип главного экрана', description: 'Figma', category: 'prototyping', priority: 'medium', dueDate: '2025-04-20', completed: false },
  { id: 3, title: 'UX интервью', description: 'Пользователи', category: 'ux-research', priority: 'high', completed: false },
  { id: 4, title: 'Иллюстрация для блога', description: 'Вектор', category: 'illustration', priority: 'low', completed: true },
];

// Функция-эмулятор API (задержка 300ms)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    // Получение списка задач с фильтрацией по статусу
    getTasks: builder.query({
      async queryFn(filterStatus) {
        await delay(300);
        let filtered = [...tasks];
        if (filterStatus === 'completed') {
          filtered = tasks.filter(t => t.completed === true);
        } else if (filterStatus === 'active') {
          filtered = tasks.filter(t => t.completed === false);
        }
        // 'all' — без фильтрации
        return { data: filtered };
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task', id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    // Добавление задачи
    addTask: builder.mutation({
      async queryFn(newTask) {
        await delay(300);
        const task = { ...newTask, id: nextId++, completed: false };
        tasks.push(task);
        return { data: task };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    // Обновление задачи (переключение выполнено / редактирование)
    updateTask: builder.mutation({
      async queryFn({ id, updates }) {
        await delay(300);
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...updates };
          return { data: tasks[index] };
        }
        throw new Error('Task not found');
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    // Удаление задачи
    deleteTask: builder.mutation({
      async queryFn(id) {
        await delay(300);
        tasks = tasks.filter(t => t.id !== id);
        return { data: id };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;