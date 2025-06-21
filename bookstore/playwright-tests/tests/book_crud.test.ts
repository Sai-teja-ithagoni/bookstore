import { test, expect, APIRequestContext } from '@playwright/test';
import { getAuthContext } from '../utils/auth';
import { createBook, getBook, updateBook, deleteBook } from '../utils/bookApi';
import { generateBookPayload } from '../utils/bookFactory';

let context: APIRequestContext;
let token: string;
let bookId: number;
let createdBookPayload: any;

test.describe('Book API - CRUD operations', () => {
  test.beforeEach(async () => {
    const auth = await getAuthContext();
    context = auth.context;
    token = auth.token;

    createdBookPayload = generateBookPayload({
      name: 'The White Tiger',
      author: 'Aravind Adiga',
      book_summary: 'A gripping tale of ambition and class struggle in India.',
    });

    const res = await createBook(context, token, createdBookPayload);
    const book = await res.json();
    bookId = book.id;
  });

  test('Create book', async () => {
    const newBook = generateBookPayload({
      name: 'Train to Pakistan',
      author: 'Khushwant Singh',
      book_summary: 'A powerful novel about the Partition of India.',
    });

    const res = await createBook(context, token, newBook);
    expect(res.status()).toBe(200);

    const created = await res.json();
    expect(created.name).toBe(newBook.name);
    expect(created.author).toBe('Khushwant Singh');
  });

  test('Read book by ID', async () => {
    const res = await getBook(context, token, bookId);
    expect(res.status()).toBe(200);

    const fetched = await res.json();
    expect(fetched.id).toBe(bookId);
    expect(fetched.name).toBe(createdBookPayload.name);
  });

  test('Update book', async () => {
    const updatedSummary = 'An updated summary exploring societal transformation.';
    const res = await updateBook(context, token, bookId, {
      ...createdBookPayload,
      book_summary: updatedSummary,
    });

    expect(res.status()).toBe(200);
    const updated = await res.json();
    expect(updated.book_summary).toBe(updatedSummary);
  });

  test('Delete book', async () => {
    const res = await deleteBook(context, token, bookId);
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.message).toMatch(/deleted/i);
  });
});
