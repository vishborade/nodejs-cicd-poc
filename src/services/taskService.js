let tasks = [
  {
    id: 1,
    title: 'Build Node.js CI/CD POC',
    completed: false
  },
  {
    id: 2,
    title: 'Add automated tests',
    completed: false
  }
];

let nextId = 3;

function getAllTasks() {
  return tasks;
}

function createTask(title) {
  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new Error('Task title is required');
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false
  };

  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const task = tasks.find((item) => item.id === Number(id));

  if (!task) {
    return null;
  }

  if (updates.title !== undefined) {
    if (typeof updates.title !== 'string' || !updates.title.trim()) {
      throw new Error('Task title cannot be empty');
    }

    task.title = updates.title.trim();
  }

  if (updates.completed !== undefined) {
    if (typeof updates.completed !== 'boolean') {
      throw new Error('completed must be a boolean');
    }

    task.completed = updates.completed;
  }

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}

function resetTasks() {
  tasks = [
    {
      id: 1,
      title: 'Build Node.js CI/CD POC',
      completed: false
    },
    {
      id: 2,
      title: 'Add automated tests',
      completed: false
    }
  ];

  nextId = 3;
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  resetTasks
};
