/* eslint no-underscore-dangle: 0 */
import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import tasksSeed from '../seed/tasks';

beforeAll(async () => {
  await Task.collection.insertMany(tasksSeed);
});

const id = '634dee7bb4b4638a321c53f3';
const invalidId = '63531a7c';
const inexistentId = '63531a7c73636855c2aa7f8c';
const mockedTask = {
  description: 'Testing',
};
const newTaskSeed = tasksSeed.map((task) => ({
  ...task,
  _id: task._id.toString(),
}));

describe('GET by id Endpoints', () => {
  test('Should fail to get a task by ID because invalid ID', async () => {
    const response = await request(app).get(`/tasks/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('Should fail to get a task by ID because inexistent ID', async () => {
    const response = await request(app).get(`/tasks/${inexistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe(`Couldn't find task with id ${inexistentId}`);
  });
  test('Should get a task by ID successfully', async () => {
    const response = await request(app).get(`/tasks/${id}`).send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toEqual(newTaskSeed[0]);
    expect(response.body.message).toBe(`Found task with id ${id}`);
  });
});
describe('GET Endpoints', () => {
  test('Should get all tasks', async () => {
    const response = await request(app).get('/tasks/').send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Tasks found');
  });

  test('Should fail to get tasks', async () => {
    await request(app).delete('/tasks/634dee7bb4b4638a321c53f3').send();
    await request(app).delete('/tasks/634dee7cb4b4638a321c53f5').send();

    const response = await request(app).get('/tasks/').send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Tasks not found');
  });
});
describe('POST Endpoints', () => {
  test('Should fail to create a task because invalid body', async () => {
    const response = await request(app).post('/tasks/').send({ description: 'Something' });

    expect(response.status).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message[0].message).toBe('Description should be Frontend, Backend or Testing');
    expect(response.body.error).toBeTruthy();
  });
  test('Should fail to create a task because empty body', async () => {
    const response = await request(app).post('/tasks/').send();

    expect(response.status).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message[0].message).toBe('A description is required');
    expect(response.body.error).toBeTruthy();
  });
  test('Should create a task successfully', async () => {
    const response = await request(app).post('/tasks/').send(mockedTask);

    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data.description).toEqual(mockedTask.description);
    expect(response.body.message).toBe('Task created successfully');
  });
});
