import request from 'supertest';
import app from '../app';
import Timesheets from '../models/Timesheets';
import timesheetsSeed from '../seed/timesheets';

beforeAll(async () => {
  await Timesheets.collection.insertMany(timesheetsSeed);
});

describe('GET /time-sheets', () => {
  test('Shoud return status code 200', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.status).toBe(200);
  });
});
