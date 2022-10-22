import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Super-admins';
import superAdminsSeed from '../seed/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

const id = '635316fe464e1ad6227622e4';
const invalidId = '635316fe464e1';
const inexistentId = '635316fe464e1ad6227622e7';
const mockedSuperAdmin = {
  firstName: 'Pepito',
  lastName: 'Perez',
  email: 'pepitoperez@gmail.com',
  password: 'pepitoperezpw',
  phone: '222666555',
  location: 'Calle falsa 123',
  dni: '25556665',
};
const mockedIncompleteSuperAdmin = {
  lastName: 'Perez',
  email: 'pepitoperez@gmail.com',
  password: 'pepitoperezpw',
  phone: '222666555',
  location: 'Calle falsa 123',
  dni: '25556665',
};
const mockedWrongSuperAdmin = {
  firstName: '555555',
  lastName: 'Perez',
  email: 'pepitoperez@gmail.com',
  password: 'pepitoperezpw',
  phone: '222666555',
  location: 'Calle falsa 123',
  dni: '25556665',
};
describe('PUT Endpoints', () => {
  test('Should modify a super admin', async () => {
    const response = await request(app).put(`/super-admins/${id}`).send(mockedSuperAdmin);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('Should fail to modify a super admin because incomplete body', async () => {
    const response = await request(app).put(`/super-admins/${id}`).send(mockedIncompleteSuperAdmin);
    expect(response.status).toBe(400);
  });

  test('Should fail to modify a super admin because invalid body', async () => {
    const response = await request(app).put(`/super-admins/${id}`).send(mockedWrongSuperAdmin);

    expect(response.status).toBe(400);
    expect(response.body.data).toBe(undefined);
  });

  test('Should fail to modify a super admin because invalid ID', async () => {
    const response = await request(app).put(`/super-admins/${invalidId}`).send(mockedSuperAdmin);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('Should fail to modify a super admin because inexistent id', async () => {
    const response = await request(app).put(`/super-admins/${inexistentId}`).send(mockedSuperAdmin);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
});
describe('DELETE Endpoints', () => {
  test('Should fail to delete a super admin because invalid ID', async () => {
    const response = await request(app).delete(`/super-admins/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('Should fail to delete a super admin because inexistent id', async () => {
    const response = await request(app).delete(`/super-admins/${inexistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });
  test('Should delete a super admin', async () => {
    const response = await request(app).delete(`/super-admins/${id}`).send();
    expect(response.status).toBe(204);
  });
});
