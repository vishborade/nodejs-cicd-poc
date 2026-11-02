const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  resetTasks
} = require('../../src/services/taskService');

describe('Task Service', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('returns the initial tasks', () => {
    const tasks = getAllTasks();

    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Build Node.js CI/CD POC');
  });

  test('creates a new task', () => {
    const task = createTask('Configure GitHub Actions');

    expect(task.id).toBe(3);
    expect(task.title).toBe('Configure GitHub Actions');
    expect(task.completed).toBe(false);

    expect(getAllTasks()).toHaveLength(3);
  });

  test('rejects an empty task title', () => {
    expect(() => createTask('')).toThrow('Task title is required');
  });

  test('updates an existing task', () => {
    const task = updateTask(1, {
      title: 'Build CI/CD demonstration',
      completed: true
    });

    expect(task.title).toBe('Build CI/CD demonstration');
    expect(task.completed).toBe(true);
  });

  test('returns null when updating a missing task', () => {
    expect(updateTask(999, { completed: true })).toBeNull();
  });

  test('deletes an existing task', () => {
    expect(deleteTask(1)).toBe(true);
    expect(getAllTasks()).toHaveLength(1);
  });

  test('returns false when deleting a missing task', () => {
    expect(deleteTask(999)).toBe(false);
  });
});
