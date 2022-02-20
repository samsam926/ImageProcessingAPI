import app from '../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  it('gets the images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });
  it('should show the resized image', async () => {
    const response = await request.get(
      '/api/images?imagename=test&ext=jpg&width=200&height=200'
    );
    expect(response.status).toBe(200);
  });
});
