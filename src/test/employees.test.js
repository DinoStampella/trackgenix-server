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
const invalidId = '666';
let newId;
const formattedEmployeeSeed = employeesSeed.map((employee) => ({
  ...employee,
  // eslint-disable-next-line no-underscore-dangle
  _id: employee._id.toString(),
  dni: parseInt(employee.dni, 10),
  phone: parseInt(employee.phone, 10),
}));
const mockedEmployee = {
  firstName: 'George',
  lastName: 'DelaSelva',
  email: 'GeorgeDelaSelva@gmail.com',
  password: 'notTarzan1234',
  dni: '30454595',
  phone: '1165642485',
  location: 'Laselva',
};

describe('GET /employees/:id', () => {
  test('should GET an employee by Id', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Found employee with id ${employeeId}`);
    expect(response.body.data).toEqual(formattedEmployeeSeed[0]);
    expect(response.body.error).toBeFalsy();
  });
  test('should not GET, invalid Id', async () => {
    const response = await request(app).get(`/employees/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid id: ${invalidId}`);
    expect(response.body.data).toEqual(undefined);
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

describe('POST /employees', () => {
  test('should create new employee', async () => {
    const response = await request(app).post('/employees/').send(mockedEmployee);

    // eslint-disable-next-line no-underscore-dangle
    newId = response.body.data._id;

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Employee created successfully');
    expect(response.body.error).toBeFalsy();
  });
  test('shouldn\'t create employee', async () => {
    mockedEmployee.password = '';
    const response = await request(app).post('/employees/').send(mockedEmployee);

    expect(response.status).toBe(400);
    expect(response.body.message[0].message).toBe('password required');
    expect(response.error).toBeTruthy();
  });
});

describe('GET /employees', () => {
  test('should GET employees', async () => {
    const response = await request(app).get('/employees').send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Employees found');
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
  test('should not GET employees', async () => {
    await request(app).delete(`/employees/${employeeId}`);
    await request(app).delete(`/employees/${newId}`);
    const response = await request(app).get('/employees/');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Employees not found');
    expect(response.body.error).toBeTruthy();
  });
});
