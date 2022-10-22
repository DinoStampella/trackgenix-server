import request from 'supertest';
import app from '../app';
import TimeSheet from '../models/Timesheets';
import timeSheetSeed from '../seed/timesheets';

beforeAll(async () => {
  await TimeSheet.collection.insertMany(timeSheetSeed);
});

const timeSheetId = '63531fd7410c845909ab22e7';

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
});
