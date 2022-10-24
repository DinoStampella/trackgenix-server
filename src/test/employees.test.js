import request from 'supertest';
import app from '../app';
import Employee from '../models/Employees';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('should return status code 200', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.status).toBe(200);
  });
  test('should return message Employees found', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.body.message).toBe('Employees found');
  });
  test('should return error false', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
  test('should return error false', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.body.error).toBeFalsy();
  });
});
