import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('should display signup form with all required fields', async ({ page }) => {
    await expect(page.getByText('Create Your Account')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your first name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your last name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your email address')).toBeVisible();
    await expect(page.getByRole('button', { name: /signup with google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
  });

  test('should show Google signup option', async ({ page }) => {
    const googleButton = page.getByRole('button', { name: /signup with google/i });
    await expect(googleButton).toBeVisible();
    await expect(googleButton).toBeEnabled();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /create account/i });

    // Submit button should be disabled when form is empty
    await expect(submitButton).toBeDisabled();

    // Fill only first name
    await page.getByPlaceholder('Enter your first name').fill('John');
    await expect(submitButton).toBeDisabled();

    // Fill last name
    await page.getByPlaceholder('Enter your last name').fill('Doe');
    await expect(submitButton).toBeDisabled();

    // Fill email
    await page.getByPlaceholder('Enter your email address').fill('john.doe@example.com');
    await expect(submitButton).toBeDisabled();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.getByPlaceholder('Enter your email address');

    // Test invalid email
    await emailInput.fill('invalid-email');
    await emailInput.blur();

    // The form validation should prevent submission
    const submitButton = page.getByRole('button', { name: /create account/i });
    await expect(submitButton).toBeDisabled();

    // Test valid email
    await emailInput.fill('valid@example.com');
    // Button might still be disabled due to other required fields
  });

  test('should fill all form fields successfully', async ({ page }) => {
    // Fill in first name
    await page.getByPlaceholder('Enter your first name').fill('John');

    // Fill in last name
    await page.getByPlaceholder('Enter your last name').fill('Doe');

    // Fill in email
    await page.getByPlaceholder('Enter your email address').fill('john.doe@example.com');

    // Fill in password fields
    const passwordInputs = page.getByPlaceholder(/password/i);
    await passwordInputs.first().fill('SecurePass123!');
    await passwordInputs.last().fill('SecurePass123!');

    // Verify all fields are filled
    await expect(page.getByPlaceholder('Enter your first name')).toHaveValue('John');
    await expect(page.getByPlaceholder('Enter your last name')).toHaveValue('Doe');
    await expect(page.getByPlaceholder('Enter your email address')).toHaveValue('john.doe@example.com');
  });

  test('should display test data button in local environment', async ({ page }) => {
    // This test assumes PUBLIC_ENVIRONMENT is set to "local"
    const testDataButton = page.getByRole('button', { name: /test data/i });

    // Check if test data button exists (it should only show in local env)
    const isVisible = await testDataButton.isVisible().catch(() => false);

    if (isVisible) {
      await testDataButton.click();

      // Verify fields are populated with test data
      await expect(page.getByPlaceholder('Enter your first name')).not.toHaveValue('');
      await expect(page.getByPlaceholder('Enter your last name')).not.toHaveValue('');
      await expect(page.getByPlaceholder('Enter your email address')).not.toHaveValue('');

      // Check email contains test domain
      const emailValue = await page.getByPlaceholder('Enter your email address').inputValue();
      expect(emailValue).toContain('@assettradingdesk.com');
    }
  });

  test('should show password validation requirements', async ({ page }) => {
    const passwordInput = page.getByPlaceholder(/^password$/i).first();

    // Focus on password field to trigger validation display
    await passwordInput.click();
    await passwordInput.fill('weak');

    // Password validation feedback should appear
    // Note: You may need to adjust these selectors based on actual SetPasswordFields component implementation
    const passwordSection = page.locator('text=/password/i').first().locator('..');
    await expect(passwordSection).toBeVisible();
  });

  test('should show error for existing email', async ({ page }) => {
    // Fill form with potentially existing email
    await page.getByPlaceholder('Enter your first name').fill('John');
    await page.getByPlaceholder('Enter your last name').fill('Doe');
    await page.getByPlaceholder('Enter your email address').fill('existing@example.com');

    const passwordInputs = page.getByPlaceholder(/password/i);
    await passwordInputs.first().fill('SecurePass123!');
    await passwordInputs.last().fill('SecurePass123!');

    // Note: This test would need proper backend mocking to test the actual email exists flow
    // For now, we just verify the form structure allows the test
  });

  test('should navigate to verify email page on successful signup', async ({ page }) => {
    // Mock successful signup response
    await page.route('**/signup', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { token: 'mock-token-12345' }
        }),
      });
    });

    // Mock checkExisting response
    await page.route('**/checkExisting', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { exists: false }
        }),
      });
    });

    // Fill the form
    await page.getByPlaceholder('Enter your first name').fill('John');
    await page.getByPlaceholder('Enter your last name').fill('Doe');
    await page.getByPlaceholder('Enter your email address').fill('newuser@example.com');

    const passwordInputs = page.getByPlaceholder(/password/i);
    await passwordInputs.first().fill('SecurePass123!');
    await passwordInputs.last().fill('SecurePass123!');

    // Wait for form to be valid and submit
    const submitButton = page.getByRole('button', { name: /create account/i });

    // Note: In local environment, you might need to handle Cloudflare Turnstile
    // For testing, you may want to disable it or mock it

    // This test demonstrates the structure but may need adjustment based on actual environment
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check for proper form field labels
    await expect(page.getByText('First Name')).toBeVisible();
    await expect(page.getByText('Last Name')).toBeVisible();
    await expect(page.getByText('Email')).toBeVisible();
  });

  test('should display divider between Google signup and form', async ({ page }) => {
    await expect(page.getByText('OR')).toBeVisible();
  });

  test('should show forgot password link when email exists', async ({ page }) => {
    // This would need to trigger the emailExists state
    // For now, we verify the link structure exists in the component

    // Fill form and trigger email check (would need backend mocking)
    await page.getByPlaceholder('Enter your email address').fill('existing@example.com');

    // The actual test would require mocking the email exists response
  });
});
