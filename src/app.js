const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    application: 'nodejs-cicd-poc'
  });
});

app.use('/api/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
