import { APIRequestContext } from '@playwright/test';
import { config } from './config';

export async function createBook(context: APIRequestContext, token: string, payload: any) {
  return context.post(`${config.baseURL}/books/`, {
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getBook(context: APIRequestContext, token: string, id: number) {
  return context.get(`${config.baseURL}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateBook(context: APIRequestContext, token: string, id: number, payload: any) {
  return context.put(`${config.baseURL}/books/${id}`, {
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deleteBook(context: APIRequestContext, token: string, id: number) {
  return context.delete(`${config.baseURL}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
