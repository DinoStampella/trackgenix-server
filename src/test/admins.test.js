import request from 'supertest';
import app from '../app';
import Admin from '../models/Admins';
import adminSeed from '../seed/admins';

test.skip('skip', () => {});

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

const adminId = '63531641063290188f2ab014';
const wrongId = '63531244ec6456efd12685ef'; // employee seed id
const mockedAdmin = {
  firstName: 'Caroline',
  lastName: 'River',
  email: 'carolineriver@gmail.com',
  password: 'kdjjfun45874',
  dni: '20458785',
  phone: '1168554785',
  location: 'Buenos Aires',
};

describe('GET /admin/:id', () => {
  test('everything correct: return status code 200', async () => {
    const res = await request(app).get(`/admins/${adminId}`);
    expect(res.status).toBe(200);
  });
  test('invalid id: return status code 400', async () => {
    const res = await request(app).get('/admins/42');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid id: 42');
    expect(res.body.error).toBeTruthy();
  });
  test('id does not exist: return status code 404', async () => {
    const res = await request(app).delete(`/admins/${wrongId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe(`Couldn't find admin with id ${wrongId}`);
    expect(res.body.error).toBeTruthy();
  });
});

describe('GET /admin/', () => {
  test('everything correct: return status code 200', async () => {
    const res = await request(app).get('/admins/');
    expect(res.status).toBe(200);
  });
  test('no admins: return status code 404', async () => {
    await request(app).delete(`/admins/${adminId}`);
    const res = await request(app).get('/admins/');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Admins not found');
    expect(res.body.error).toBeTruthy();
  });
});

describe('POST /admin/:id', () => {
  test('everything correct: return status code 201', async () => {
    const res = await request(app).post('/admins/').send(mockedAdmin);
    expect(res.status).toBe(201);
  });
  test('validations: return status code 400', async () => {
    mockedAdmin.firstName = '';
    const res = await request(app).post('/admins/').send(mockedAdmin);
    expect(res.status).toBe(400);
    expect(res.body.message[0].message).toBe('first name required');
    expect(res.body.error).toBeTruthy();
  });
});
