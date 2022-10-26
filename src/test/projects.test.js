import request from 'supertest';
import app from '../app';
import Project from '../models/Projects';
import ProjectSeed from '../seed/projects';

beforeAll(async () => {
  await Project.collection.insertMany(ProjectSeed);
});

let newIdProject;

const mockedProject = {
  name: 'Goomess',
  description: 'This is a description',
  startDate: '11-10-2023',
  endDate: '07-10-2024',
  active: true,
  clientName: 'Martins',
  teamMembers: [
    {
      employee: '63531244ec6456efd12685ef',
      role: 'DEV',
      rate: 100,
    },
  ],
};

describe('GET BYID /project/:id', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/projects/63531aaa2b654a3fb77054dd').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Found project with id 63531aaa2b654a3fb77054dd');
  });
  test('Should return status code 400', async () => {
    const response = await request(app).get('/projects/568').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Invalid id: 568');
  });
  test('Should return status code 404', async () => {
    const response = await request(app).get('/projects/63531244ec6456efd12685ef').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /project', () => {
  test('Should create an project', async () => {
    const response = await request(app).post('/projects').send(mockedProject);
    // eslint-disable-next-line no-underscore-dangle
    newIdProject = response.body.data._id;
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Project created successfully');
  });
  test('Should not create an project', async () => {
    const response = await request(app).post('/projects').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message[0].message).toBe('Name required');
  });
});

describe('GET /project', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBe('Projects found');
  });
  test('Should return status code 404', async () => {
    await request(app).delete('/projects/63531aaa2b654a3fb77054dd');
    await request(app).delete(`/projects/${newIdProject}`);
    const response = await request(app).get('/projects/').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Projects not found');
  });
});
