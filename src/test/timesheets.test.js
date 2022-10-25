import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import TimeSheet from '../models/Timesheets';
import timeSheetSeed from '../seed/timesheets';

beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeed);
});

const timeSheetId = '63531fd7410c845909ab22e7';
const fakeTimeSheetId = '63531fd7410c845909ab22e6';
const wrongTimeSheetId = '1234fds';

const correctMockedTimeSheet = {
  date: '2022-10-22T00:00:00.000+00:00',
  task: mongoose.Types.ObjectId('63531a7c73636855c2aa7f9a'),
  description: 'Backend',
  project: mongoose.Types.ObjectId('63531aaa2b654a3fb77054dd'),
  employee: mongoose.Types.ObjectId('63531244ec6456efd12685ef'),
  hours: 10,
};

const wrongMockedTimeSheet = {
  date: '2022-10-22T00:00:00.000+00:00',
  description: 'Backend',
  project: mongoose.Types.ObjectId('63531aaa2b654a3fb77054dd'),
  employee: mongoose.Types.ObjectId('63531244ec6456efd12685ef'),
  hours: 15,
};

describe('UPDATE /timesheet', () => {
  test('Test on a success update', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(correctMockedTimeSheet);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.hours).toBe(10);
  });

  test('Test on a update with a incorrect format id', async () => {
    const response = await request(app).put(`/time-sheets/${wrongTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('Test on a update with wrong time sheet', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(wrongMockedTimeSheet);
    expect(response.status).toBe(400);
    expect(response.body.data).toBe(undefined);
    expect(response.body.message[0].message).toContain('"task" is required');
    expect(response.body.message[1].message).toContain('maximum 12 hours');
  });

  test('Test on a update with an non existing employee', async () => {
    const response = await request(app).put(`/time-sheets/${fakeTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /timesheet', () => {
  test('Test of a success delete', async () => {
    const response = await request(app).delete(`/time-sheets/${timeSheetId}`).send();
    expect(response.status).toBe(204);
  });

  test('Test of a failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${wrongTimeSheetId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toContain(`${wrongTimeSheetId}`);
  });

  test('Test of a failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${fakeTimeSheetId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toContain(`${fakeTimeSheetId}`);
  });
});
