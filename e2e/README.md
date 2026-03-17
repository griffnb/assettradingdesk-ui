# End-to-End Tests

This directory contains Playwright end-to-end tests for the application.

## Setup

Playwright is already installed as a dev dependency. To install the browsers:

```bash
npx playwright install chromium
```

## Running Tests

### Run all tests (headless)
```bash
pnpm test:e2e
```

### Run tests with UI mode (interactive)
```bash
pnpm test:e2e:ui
```

### Run tests in headed mode (see browser)
```bash
pnpm test:e2e:headed
```

### Run specific test file
```bash
npx playwright test e2e/signup.spec.ts
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

## Test Files

### signup.spec.ts
Tests the complete signup flow including:
- Form field validation
- Email format validation
- Password requirements
- Google signup option
- Test data generation (local env only)
- Email existence checking
- Navigation after successful signup

## Configuration

The Playwright configuration is in [playwright.config.ts](../playwright.config.ts) at the root level.

Key settings:
- Base URL: `http://localhost:5173`
- Auto-starts dev server before tests
- Screenshots on failure
- Trace on first retry
- HTML reporter for results

## Writing New Tests

1. Create a new `.spec.ts` file in the `e2e` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Use descriptive test names and group related tests with `test.describe()`
4. Follow existing patterns for page navigation and assertions

## Best Practices

- Use `page.getByRole()` and `page.getByPlaceholder()` for better accessibility
- Add `test.beforeEach()` for common setup
- Mock API responses for predictable test results
- Use `await expect()` for assertions
- Keep tests focused and independent
- Clean up test data after tests complete

## Debugging

If tests fail:
1. Check the HTML report: `npx playwright show-report`
2. View screenshots in `test-results/` directory
3. Use `--headed` flag to see what's happening
4. Use `--debug` flag to step through tests
5. Add `await page.pause()` in tests to pause execution

## CI/CD Integration

Tests are configured to run in CI with:
- 2 retries on failure
- Single worker for consistency
- Screenshots and traces on failure

## Notes

- The signup flow uses Cloudflare Turnstile in production, which may need to be disabled or mocked for testing
- Test data generation button only appears in local environment
- Some tests require backend API mocking for complete coverage
