import request from 'supertest';
import app from '../app';
import Employee from '../models/Employees';
import employeesSeed from '../seed/employees';

const mockedEmployee = {
  firstName: 'Peter',
  lastName: 'Hills',
  email: 'peterhills@gmail.com',
  password: 'Axhvbhd7844',
  dni: '30457895',
  phone: '1168542485',
  location: 'Montana',
};

const mockedEmployeeModified = {
  firstName: 'Carlos',
  lastName: 'Guevara',
  email: 'CarlosGuevara@gmail.com',
  password: 'passwordreseguro',
  dni: '12345678',
  phone: '1168542425',
  location: 'Miame',
};

const mockedEmployeeWithNumbers = {
  _id: '63531244ec6456efd12685ef',
  firstName: 'Carlos',
  lastName: 'Guevara',
  email: 'CarlosGuevara@gmail.com',
  password: 'passwordreseguro',
  dni: 12345678,
  phone: 1168542425,
  location: 'Miame',
};

const mockedEmployeeInvalid = {
  firstName: 'Carlos',
  lastName: 'Hills',
  email: '',
  password: 'Axhvbhd7844',
  dni: '30457895',
  phone: '1168542485',
  location: 'Montana',
};

const employeeIdPeter = '63531244ec6456efd12685ef';
const employeeIdErnesto = '63573014db9ebdd9d24e7b93';
const invalidId = 123;

beforeAll(async () => {
  await Employee.collection.insertMany(employeesSeed);
});

describe('Delete/employees', () => {
  test('should return status code 204', async () => {
    const response = await request(app).delete(`/employees/${employeeIdErnesto}`).send();
    expect(response.status).toBe(204);
  });
  test('should return 400', async () => {
    const response = await request(app).delete(`/employees/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('should return 404', async () => {
    const response = await request(app).delete(`/employees/${employeeIdErnesto}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find employee with id ${employeeIdErnesto}`);
  });
});

describe('Put/employees', () => {
  test('should return status code 200', async () => {
    const response = await request(app).put(`/employees/${employeeIdPeter}`).send(mockedEmployeeModified);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(mockedEmployeeWithNumbers);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe(`Modified employee with id ${employeeIdPeter}`);
  });
  test('should return status code 400', async () => {
    const response = await request(app).put(`/employees/${invalidId}`).send(mockedEmployee);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
  });
  test('should return status code 404', async () => {
    const idThatNotexist = '62731244ec6456efd12685ef';
    const response = await request(app).put(`/employees/${idThatNotexist}`).send(mockedEmployee);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe(`Couldn't find employee with id ${idThatNotexist}`);
  });
  test('should return status code 400 validate error', async () => {
    const response = await request(app).put(`/employees/${employeeIdPeter}`).send(mockedEmployeeInvalid);
    expect(response.status).toBe(400);
    expect(response.body.message[0].message).toBe('email required');
  });
});
