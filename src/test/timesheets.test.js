import request from 'supertest';
import app from '../app';
import TimeSheet from '../models/Timesheets';
import timeSheetSeed from '../seed/timesheets';

beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeed);
});

const timeSheetId = '63531fd7410c845909ab22e7';
const fakeTimeSheetId = '63531fd7410c845909ab22e6';
const wrongTimeSheetId = '1234fds';

// const mockedTimeSheet = {
//   date: '20-04-2022',
//   description: 'A description',
//   hours: 300,
// };

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
