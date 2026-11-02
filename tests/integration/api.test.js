const request = require('supertest');
const app = require('../../src/app');
const { resetTasks } = require('../../src/services/taskService');

describe('Task Manager API', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('GET /health returns healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.application).toBe('nodejs-cicd-poc');
  });

  test('GET /api/tasks returns tasks', async () => {
    const response = await request(app).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test('POST /api/tasks creates a task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Configure Jenkins'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Configure Jenkins');
    expect(response.body.completed).toBe(false);
  });

  test('POST /api/tasks rejects an empty title', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: ''
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Task title is required');
  });

  test('PUT /api/tasks/:id updates a task', async () => {
    const response = await request(app)
      .put('/api/tasks/1')
      .send({
        completed: true
      });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('PUT /api/tasks/:id returns 404 for missing task', async () => {
    const response = await request(app)
      .put('/api/tasks/999')
      .send({
        completed: true
      });

    expect(response.status).toBe(404);
  });

  test('DELETE /api/tasks/:id deletes a task', async () => {
    const response = await request(app)
      .delete('/api/tasks/1');

    expect(response.status).toBe(204);

    const listResponse = await request(app).get('/api/tasks');

    expect(listResponse.body).toHaveLength(1);
  });
});
