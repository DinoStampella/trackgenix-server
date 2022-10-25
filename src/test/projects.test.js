import request from 'supertest';
import app from '../app';
import Project from '../models/Projects';
import projectSeed from '../seed/projects';

beforeAll(async () => {
  await Project.collection.insertMany(projectSeed);
});

const projectId = '63531aaa2b654a3fb77054dd';
const mockedProject = {
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
  test('everything correct: return status code 200', async () => {
    const res = await request(app).put(`/projects/${projectId}`).send(mockedProject);
    expect(res.status).toBe(200);
  });
  test('validations: return status code 400', async () => {
    mockedProject.name = '';
    const res = await request(app).put(`/projects/${projectId}`).send(mockedProject);
    expect(res.status).toBe(400);
    expect(res.body.message[0].message).toBe('Name required');
    expect(res.body.error).toBeTruthy();
  });
  test('invalid id: return status code 400', async () => {
    mockedProject.name = 'Eric';
    const res = await request(app).put('/projects/69').send(mockedProject);
    expect(res.status).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
  test('id does not exist: return status code 404', async () => {
    const res = await request(app).put(`/projects/${mockedProject.teamMembers[0].employee}`).send(mockedProject);
    expect(res.status).toBe(404);
    expect(res.body.error).toBeTruthy();
  });
});

describe('DELETE /project/:id', () => {
  test('everything correct: return status code 204', async () => {
    const res = await request(app).delete(`/projects/${projectId}`);
    expect(res.status).toBe(204);
  });
  test('invalid id: return status code 400', async () => {
    const res = await request(app).delete('/projects/42');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid id 42.');
    expect(res.body.error).toBeTruthy();
  });
  test('id does not exist: return status code 404', async () => {
    const res = await request(app).delete(`/projects/${mockedProject.teamMembers[0].employee}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe(`Couldn't find project with id ${mockedProject.teamMembers[0].employee}`);
    expect(res.body.error).toBeTruthy();
  });
});
