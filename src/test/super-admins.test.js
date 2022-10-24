import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seed/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

describe('GET /super-admins', () => {
  test('sholud return status code 200', async () => {
    const response = await request(app).get('/super-admins').send();

    expect(response.status).toBe(200);
  });
  test('sholud return error false', async () => {
    const response = await request(app).get('/super-admins').send();

    expect(response.body.error).toBeFalsy();
  });
  test('sholud return more than one employee', async () => {
    const response = await request(app).get('/super-admins').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
