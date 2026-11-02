const VALID_PRIORITIES = ['Low', 'Medium', 'High'];

let tasks = [
  {
    id: 1,
    title: 'Build Node.js CI/CD POC',
    completed: false,
    priority: 'High'
  },
  {
    id: 2,
    title: 'Add automated tests',
    completed: false,
    priority: 'Medium'
  }
];

let nextId = 3;

function getAllTasks() {
  return tasks;
}

function createTask(title, priority = 'Medium') {
  if (!title || typeof title !== 'string' || !title.trim()) {
    throw new Error('Task title is required');
  }

  if (!VALID_PRIORITIES.includes(priority)) {
    throw new Error('Priority must be Low, Medium, or High');
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
    priority
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

  if (updates.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(updates.priority)) {
      throw new Error('Priority must be Low, Medium, or High');
    }

    task.priority = updates.priority;
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
      completed: false,
      priority: 'High'
    },
    {
      id: 2,
      title: 'Add automated tests',
      completed: false,
      priority: 'Medium'
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
