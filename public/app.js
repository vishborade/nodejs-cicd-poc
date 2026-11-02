const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const taskCount = document.getElementById('task-count');
const message = document.getElementById('message');

function showMessage(text, type = 'error') {
  message.textContent = text;
  message.className = type;

  setTimeout(() => {
    message.textContent = '';
    message.className = '';
  }, 3000);
}

async function loadTasks() {
  try {
    const response = await fetch('/api/tasks');

    if (!response.ok) {
      throw new Error('Unable to load tasks');
    }

    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    showMessage(error.message);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = '';

  taskCount.textContent =
    `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = task.completed ? 'completed' : '';

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    checkbox.addEventListener('change', async () => {
      await updateTask(task.id, checkbox.checked);
    });

    const title = document.createElement('span');
    title.textContent = task.title;

    const priority = document.createElement('span');
    priority.className = `priority priority-${task.priority.toLowerCase()}`;
    priority.textContent = task.priority;

    taskInfo.appendChild(checkbox);
    taskInfo.appendChild(title);
    taskInfo.appendChild(priority);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', async () => {
      await deleteTask(task.id);
    });

    item.appendChild(taskInfo);
    item.appendChild(deleteButton);

    taskList.appendChild(item);
  });
}

taskForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = taskTitle.value.trim();
  const priority = taskPriority.value;

  if (!title) {
    return;
  }

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, priority })
    });

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error || 'Unable to create task');
    }

    taskTitle.value = '';
    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
});

async function updateTask(id, completed) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) {
      throw new Error('Unable to update task');
    }

    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Unable to delete task');
    }

    await loadTasks();
  } catch (error) {
    showMessage(error.message);
  }
}

loadTasks();
