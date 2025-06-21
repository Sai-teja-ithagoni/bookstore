export function generateBookPayload(overrides = {}) {
  const timestamp = Date.now(); // helps make book name unique

  const basePayload = {
    name: `Book ${timestamp}`,
    author: 'Test Author',
    published_year: 2024,
    book_summary: 'Generated summary for testing.',
  };

  return { ...basePayload, ...overrides };
}
