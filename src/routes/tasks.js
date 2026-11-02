const express = require('express');

const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../services/taskService');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getAllTasks());
});

router.post('/', (req, res) => {
  try {
    const task = createTask(req.body.title, req.body.priority);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', (req, res) => {
  try {
    const task = updateTask(req.params.id, req.body);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    return res.json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const deleted = deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'Task not found' });
  }

  return res.status(204).send();
});

module.exports = router;
