type EnvConfig = {
  baseURL: string;
};

const env = process.env.TEST_ENV || 'local';

const configs: Record<string, EnvConfig> = {
  local: {
    baseURL: 'http://127.0.0.1:8000',
  },
  qa: {
    baseURL: 'https://qa.bookstore.example.com',
  },
  uat: {
    baseURL: 'https://uat.bookstore.example.com',
  },
  prod: {
    baseURL: 'https://bookstore.example.com',
  },
};

export const config = configs[env];
