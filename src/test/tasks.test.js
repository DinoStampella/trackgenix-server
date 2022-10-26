/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Task from '../models/Tasks';
import Taskseed from '../seed/tasks';

const mockedTask = {
  description: 'Backend',
};

const mockedTaskModified = {
  description: 'Testing',
};

const mockedTaskInvalid = {
  description: 'Apple',
};

const firstTaskId = Taskseed[0]._id;
const secondTaskId = Taskseed[1]._id;
const invalidId = 123;
const invalidTaskId = '62731244ec6456efd12685ef';

beforeAll(async () => {
  await Task.collection.insertMany(Taskseed);
});

describe('Delete/task', () => {
  test('should return status code 204', async () => {
    const response = await request(app).delete(`/tasks/${firstTaskId}`).send();
    expect(response.status).toBe(204);
  });
  test('should return 400', async () => {
    const response = await request(app).delete(`/tasks/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id ${invalidId}`);
  });
  test('should return 404', async () => {
    const response = await request(app).delete(`/tasks/${firstTaskId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find task with id ${firstTaskId}`);
  });
});

describe('Put/employees', () => {
  test('should return status code 200', async () => {
    const response = await request(app).put(`/tasks/${secondTaskId}`).send(mockedTaskModified);
    expect(response.status).toBe(200);
    expect(response.body.data.description).toBe('Testing');
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Modified task with id ${secondTaskId}`);
  });
  test('should return status code 400', async () => {
    const response = await request(app).put(`/tasks/${invalidId}`).send(mockedTask);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id ${invalidId}`);
  });
  test('should return status code 404', async () => {
    const response = await request(app).put(`/tasks/${invalidTaskId}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find task with id ${invalidTaskId}`);
  });
  test('should return status code 400 validate error', async () => {
    const response = await request(app).put(`/tasks/${secondTaskId}`).send(mockedTaskInvalid);
    expect(response.status).toBe(400);
    expect(response.body.message[0].message).toBe('Description should be Frontend, Backend or Testing');
    expect(response.error).toBeTruthy();
  });
});
