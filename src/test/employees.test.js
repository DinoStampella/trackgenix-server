import request from 'supertest';
import app from '../app';
import Employee from '../models/Employees';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employee.collection.insertMany(employeesSeed);
});

jest.setTimeout(60000);

const employeeId = '63531244ec6456efd12685ef';
const notExistId = '03034564ec6456efd12675ef';
const invalidId = 'aps45';
const fixEmployee = employeesSeed.map((employee) => ({
  ...employee,
  // eslint-disable-next-line no-underscore-dangle
  _id: employee._id.toString(),
  dni: parseInt(employee.dni, 10),
  phone: parseInt(employee.phone, 10),
}));

describe('GETById /employees/:id', () => {
  test('should GET an employee by Id', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(fixEmployee[0]);
    expect(response.body.error).toBeFalsy();
  });
  test('should not GET, invalid Id', async () => {
    const response = await request(app).get(`/employees/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
    expect(response.body.error).toBeTruthy();
  });
  test('should not GET, non-existent Id', async () => {
    const response = await request(app).get(`/employees/${notExistId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Couldn't find employee with id ${notExistId}`);
    expect(response.body.data).toBe(undefined);
    expect(response.body.error).toBeTruthy();
  });
});
