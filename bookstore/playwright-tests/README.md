# 📚 Bookstore API Automation Framework

This repository contains an API automation framework to validate the [FastAPI-based Bookstore backend](https://github.com/JK-Technosoft-Limited/bookstore).  
The framework is built using **Playwright’s API testing feature in TypeScript**, with support for:

- 📁 Modular utilities
- 📊 Allure & HTML reporting
- 🌍 Multi-environment support
- ⚙️ CI/CD readiness via GitHub Actions

---

## 🛠️ Tech Stack

- **Language**: TypeScript  
- **Test Runner**: Playwright Test  
- **Reporting**: Playwright HTML & Allure  
- **Environments**: Local, QA, UAT, Prod  
- **Docker Support**: For running Allure report UI  

---

## 📁 Project Structure

```
playwright-tests/
├── config/
│   └── config.ts             # Environment-specific configs
├── tests/
│   ├── auth_flow.test.ts     # Auth: Get JWT token
│   └── book_crud.test.ts     # Book CRUD tests
├── utils/
│   ├── auth.ts               # Auth utilities
│   ├── bookApi.ts            # Reusable Book API actions
│   └── bookFactory.ts        # Book payload generator
├── playwright.config.ts      # Playwright setup
├── package.json
└── README.md
```

---

## ✅ Pre-requisites

Ensure the following are installed:

- [Node.js (v18+)](https://nodejs.org/)
- [Playwright CLI](https://playwright.dev/)
- [Docker](https://docs.docker.com/get-docker/) (for Allure UI)
- FastAPI backend running locally at `http://127.0.0.1:8000`

---

## 🚀 Setup Instructions

### 1. Clone and Navigate

```bash
git clone https://github.com/JK-Technosoft-Limited/bookstore
cd bookstore/bookstore
```

### 2. Create Playwright Test Folder

```bash
mkdir playwright-tests && cd playwright-tests
npm init -y
```

### 3. Install Dependencies

```bash
npm i -D @playwright/test typescript ts-node allure-playwright
npx playwright install
```

### 4. Set up TypeScript (Optional)

```bash
npx tsc --init
```

Or create a basic `tsconfig.json` manually.

---

## 🧪 Running Tests
navigate to playwright-tests folder so that you can access to playwright services

### Basic Run

```bash
npx playwright test
```

### With Allure Reporting

```bash
npx playwright test --reporter=line,allure-playwright
```

---

## 📊 Viewing Reports

### View Playwright HTML Report

```bash
npx playwright show-report
```

### View Allure Report (Docker)


```bash
sudo usermod -aG docker $USER
newgrp docker
docker run -p 5050:5050 \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  frankescobar/allure-docker-service
```

Then open in browser: [http://localhost:5050](http://localhost:5050)
http://localhost:5050/allure-docker-service/projects/default/reports/latest/index.html

---

## 🤖 CI/CD Setup (GitHub Actions)

Create this file: `.github/workflows/playwright.yml`

```yaml
name: Run API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd bookstore/playwright-tests
          npm ci
          npx playwright install --with-deps
      - name: Run tests
        run: |
          cd bookstore/playwright-tests
          npx playwright test --reporter=line,allure-playwright
```

---

## 👨‍💻 Author

Maintained by [Sai Teja Ithagoni](https://github.com/Sai-teja-ithagoni)

---

Happy Testing! 🎯
