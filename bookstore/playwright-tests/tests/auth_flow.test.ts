import { test, expect, request } from '@playwright/test';
import { getAuthContext } from '../utils/auth';

const BASE_URL = 'http://127.0.0.1:8000';

test('signup and login with valid credentials', async () => {
  const { token } = await getAuthContext();
  expect(token).toBeTruthy();
});

test('should fail login with incorrect password', async () => {
  const context = await request.newContext({ baseURL: BASE_URL });

  const email = `user${Date.now()}@test.com`;
  const password = 'correct123';

  await context.post('/signup', { data: { email, password } });

  const loginRes = await context.post('/login', {
    data: { email, password: 'wrongpass' },
  });

  expect(loginRes.status()).toBe(400);
});

test('should fail to signup with duplicate email', async () => {
  const context = await request.newContext({ baseURL: BASE_URL });

  const email = `user${Date.now()}@test.com`;
  const password = 'dup123';

  await context.post('/signup', { data: { email, password } });

  const secondSignup = await context.post('/signup', {
    data: { email, password },
  });

  expect(secondSignup.status()).toBe(400);
});
