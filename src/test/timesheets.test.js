import request from 'supertest';
import app from '../app';
import Timesheets from '../models/Timesheets';
import timesheetsSeed from '../seed/timesheets';

beforeAll(async () => {
  await Timesheets.collection.insertMany(timesheetsSeed);
});

const mockedTimesheets = {
  date: '2022-10-22T00:00:00.000+00:00',
  task: '63531a7c73636855c2aa7f9a',
  description: 'Backend',
  project: '63531aaa2b654a3fb77054dd',
  employee: '63531244ec6456efd12685ef',
  hours: 10,
};

let idTimesheet;
const timeSheetIdSeed = '63531fd7410c845909ab22e7';
const invalidId = '7777h5t';
const nonExistentId = '67534ff7410c845909ab22e7';

describe('GET /time-sheets/:id', () => {
  test('Should return all time-sheets successfully', async () => {
    const response = await request(app).get(`/time-sheets/${timeSheetIdSeed}`);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Found timesheet with id 63531fd7410c845909ab22e7');
  });

  test('Should return 404 status when there is no time-sheet with a valid id ', async () => {
    const response = await request(app).get(`/time-sheets/${nonExistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
  });

  test('Should return 400 status when a invalid id is received ', async () => {
    const response = await request(app).get(`/time-sheets/${invalidId}`).send();

    expect(response.status).toBe(400);
    expect(response.body.error).toBe(true);
  });
});

describe('POST /time-sheets', () => {
  test('Should create a time-sheet when all valid data is entered', async () => {
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    // eslint-disable-next-line no-underscore-dangle
    idTimesheet = response.body.data._id;

    expect(response.status).toBe(201);
  });

  test('Should not create a time-sheet if there is no data received', async () => {
    const response = await request(app).post('/time-sheets').send();

    expect(response.status).toBe(400);
  });

  test('Should not create a time-sheet if date is empty', async () => {
    mockedTimesheets.date = '';
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(400);
    mockedTimesheets.date = '2022-10-22T00:00:00.000+00:00';
  });

  test('Should not create a time-sheet if task is empty', async () => {
    mockedTimesheets.task = '';
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(400);
    mockedTimesheets.task = '63531a7c73636855c2aa7f9a';
  });

  test('Should not create a time-sheet if project is empty', async () => {
    mockedTimesheets.project = '';
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(400);
    mockedTimesheets.project = '63531a7c73636855c2aa7f9a';
  });

  test('Should not create a time-sheet if employee is empty', async () => {
    mockedTimesheets.employee = '';
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(400);
    mockedTimesheets.employee = '63531a7c73636855c2aa7f9a';
  });
});

describe('GET /time-sheets', () => {
  test('Should return time-sheets successfully', async () => {
    const response = await request(app).get('/time-sheets').send();

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBe('Timesheets found');
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('Should return 404 status when there are no thime-sheets ', async () => {
    await request(app).delete(`/time-sheets/${timeSheetIdSeed}`).send();
    await request(app).delete(`/time-sheets/${idTimesheet}`).send();

    const response = await request(app).get('/time-sheets').send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBe(true);
    expect(response.body.message).toBe('Timesheets not found');
  });
});
