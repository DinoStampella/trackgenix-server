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

const BackendTask = '63531a7c73636855c2aa7f9a';
const FrontendTask = '6357795eb78425a9d8da6849';
const invalidId = 123;

beforeAll(async () => {
  await Task.collection.insertMany(Taskseed);
});

describe('Delete/task', () => {
  test('should return status code 204', async () => {
    const response = await request(app).delete(`/tasks/${BackendTask}`).send();
    expect(response.status).toBe(204);
  });
  test('should return 400', async () => {
    const response = await request(app).delete(`/tasks/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id ${invalidId}`);
  });
  test('should return 404', async () => {
    const response = await request(app).delete(`/tasks/${BackendTask}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find task with id ${BackendTask}`);
  });
});

describe('Put/employees', () => {
  test('should return status code 200', async () => {
    const response = await request(app).put(`/tasks/${FrontendTask}`).send(mockedTaskModified);
    expect(response.status).toBe(200);
    expect(response.body.data.description).toBe('Testing');
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Modified task with id ${FrontendTask}`);
  });
  test('should return status code 400', async () => {
    const response = await request(app).put(`/tasks/${invalidId}`).send(mockedTask);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid id ${invalidId}`);
  });
  test('should return status code 404', async () => {
    const idThatNotexist = '62731244ec6456efd12685ef';
    const response = await request(app).put(`/tasks/${idThatNotexist}`).send(mockedTask);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find task with id ${idThatNotexist}`);
  });
  test('should return status code 400 validate error', async () => {
    const response = await request(app).put(`/tasks/${FrontendTask}`).send(mockedTaskInvalid);
    expect(response.status).toBe(400);
    expect(response.body.message[0].message).toBe('Description should be Frontend, Backend or Testing');
  });
});
