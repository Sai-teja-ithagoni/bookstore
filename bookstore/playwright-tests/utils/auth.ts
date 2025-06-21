import { request as playwrightRequest, APIRequestContext } from '@playwright/test';
import { config } from './config';

export async function getAuthContext(): Promise<{ context: APIRequestContext; token: string }> {
  const context = await playwrightRequest.newContext();
  const email = `user_${Date.now()}@example.com`;
  const password = 'test@123';

  // Signup
  await context.post(`${config.baseURL}/signup`, {
    data: { email, password },
  });

  // Login
  const loginRes = await context.post(`${config.baseURL}/login`, {
    data: { email, password },
  });

  const body = await loginRes.json();
  const token = body.access_token;

  return { context, token };
}
