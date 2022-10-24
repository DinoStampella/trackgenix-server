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

describe('DELETE /timesheet', () => {
  test('Test status code success delete', async () => {
    const response = await request(app).delete(`/time-sheets/${timeSheetId}`).send();
    expect(response.status).toBe(204);
  });

  test('Test status code failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${wrongTimeSheetId}`).send();
    expect(response.status).toBe(400);
  });
  test('Test error in failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${wrongTimeSheetId}`).send();
    expect(response.body.error).toBeTruthy();
  });
  test('Test error messagge contain id in failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${wrongTimeSheetId}`).send();
    expect(response.body.message).toContain(`${wrongTimeSheetId}`);
  });

  test('Test status code failure delete (no employee found)', async () => {
    const response = await request(app).delete(`/time-sheets/${fakeTimeSheetId}`).send();
    expect(response.status).toBe(404);
  });
  test('Test error in failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${fakeTimeSheetId}`).send();
    expect(response.body.error).toBeTruthy();
  });
  test('Test error messagge contain id in failure delete (wrong id)', async () => {
    const response = await request(app).delete(`/time-sheets/${fakeTimeSheetId}`).send();
    expect(response.body.message).toContain(`${fakeTimeSheetId}`);
  });
});

describe('UPDATE /timesheet', () => {
//   test('Test status code success update', async () => {
//     const response = await request(app).put(`/time-sheets/${timeSheetId}`)
// .send(correctMockedTimeSheet);
//     console.log(response.body);
//     expect(response.status).toBe(200);
//   });

  test('Test status code failure update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${wrongTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.status).toBe(400);
  });
  test('Test error in failure update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${wrongTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.body.error).toBeTruthy();
  });

  test('Test status code wrong content update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(wrongMockedTimeSheet);
    expect(response.status).toBe(400);
  });
  test('Test error with wrong content update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(wrongMockedTimeSheet);
    expect(response.body.data).toBe(undefined);
  });
  test('Test error with wrong content update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${timeSheetId}`).send(wrongMockedTimeSheet);
    expect(response.body.message[0].message).toContain('"task" is required');
    expect(response.body.message[1].message).toContain('maximum 12 hours');
  });

  test('Test status code failure update (no employee found)', async () => {
    const response = await request(app).put(`/time-sheets/${fakeTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.status).toBe(404);
  });
  test('Test error in failure update (wrong id)', async () => {
    const response = await request(app).put(`/time-sheets/${fakeTimeSheetId}`).send(correctMockedTimeSheet);
    expect(response.body.error).toBeTruthy();
  });
});
