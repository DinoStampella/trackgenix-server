import request from 'supertest';
import app from '../app';
import Project from '../models/Projects';
import projectSeed from '../seed/projects';

beforeAll(async () => {
  await Project.collection.insertMany(projectSeed);
});

const projectId = '63531aaa2b654a3fb77054dd';
const seed = {
  name: 'Eric',
  description: 'asdsadsaddssa',
  startDate: '11-10-2024',
  endDate: '07-12-2024',
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

describe('PUT /project/:id', () => {
  test('everything correct: returns status code 200', async () => {
    const res = await request(app).put(`/projects/${projectId}`).send(seed);
    expect(res.status).toBe(200);
  });
  test('wrong id: returns status code 404', async () => {
    const res = await request(app).put('/projects/69').send(seed);
    expect(res.status).toBe(404);
  });
  test('validations: returns status code 400', async () => {
    seed.name = '';
    const res = await request(app).put(`/projects/${projectId}`).send(seed);
    expect(res.status).toBe(400);
    expect(res.body.message[0].message).toBe('Name required');
  });
});

describe('DELETE /project/:id', () => {
  test('everything correct: returns status code 204', async () => {
    const res = await request(app).delete(`/projects/${projectId}`);
    expect(res.status).toBe(200);
  });
  test('wrong id: returns status code 404', async () => {
    const res = await request(app).delete('/projects/69');
    expect(res.status).toBe(404);
  });
});
