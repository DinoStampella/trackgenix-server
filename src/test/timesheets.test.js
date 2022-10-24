import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Timesheets from '../models/Timesheets';
import timesheetsSeed from '../seed/timesheets';

beforeAll(async () => {
  await Timesheets.collection.insertMany(timesheetsSeed);
});

const mockedTimesheets = {
  date: '2022-10-22T00:00:00.000+00:00',
  task: mongoose.Types.ObjectId('63531a7c73636855c2aa7f9a'),
  description: 'Backend',
  project: mongoose.Types.ObjectId('63531aaa2b654a3fb77054dd'),
  employee: mongoose.Types.ObjectId('63531244ec6456efd12685ef'),
  hours: 10,
};

describe('GET /time-sheets', () => {
  test('Should return status code 200', async () => {
    const response = await request(app).get('/time-sheets').send();

    expect(response.status).toBe(200);
  });

  test('Should return error : false', async () => {
    const response = await request(app).get('/time-sheets').send();

    expect(response.body.error).toBeFalsy();
  });

  test('Should return one or more employees', async () => {
    const response = await request(app).get('/time-sheets').send();

    expect(response.body.data.length).toBeGreaterThan(0);
  });
});

describe('POST /time-sheets', () => {
  test('Should create a time-sheet', async () => {
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(201);
  });

  test('Should not create a time-sheet if its empty', async () => {
    const response = await request(app).post('/time-sheets').send();

    expect(response.status).toBe(400);
  });

  test('Should not create a time-sheet if date is empty', async () => {
    mockedTimesheets.date = '';
    const response = await request(app).post('/time-sheets').send(mockedTimesheets);

    expect(response.status).toBe(400);
    mockedTimesheets.date = '2022-10-22T00:00:00.000+00:00';
  });
});
