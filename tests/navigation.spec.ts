import { test, expect } from '@playwright/test';

test.describe('RapidResQ Navigation', () => {
  test('pages should load', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveTitle(/RapidResQ/);

    await page.goto('http://localhost:3000/setup');
    await expect(page.getByText('Voice Keywords')).toBeVisible();

    await page.goto('http://localhost:3000/contacts');
    await expect(page.getByText('Emergency Protocol')).toBeVisible();

    await page.goto('http://localhost:3000/history');
    await expect(page.getByText('Incident Logs')).toBeVisible();
  });

  test('emergency page should load', async ({ page }) => {
    await page.goto('http://localhost:3000/emergency?reason=Test');
    await expect(page.getByText('Emergency Core')).toBeVisible();
    await expect(page.getByText('Seconds Left')).toBeVisible();
  });
});
