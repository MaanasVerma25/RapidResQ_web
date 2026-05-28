import { test, expect } from '@playwright/test';

test.describe('RapidResQ Navigation', () => {
  test('pages should load', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');
    await expect(page).toHaveTitle(/RapidResQ/);

    await page.goto('http://localhost:3000/setup');
    await expect(page.getByText('Voice Keyword Detection')).toBeVisible();

    await page.goto('http://localhost:3000/contacts');
    await expect(page.getByText('Emergency Protocol')).toBeVisible();

    await page.goto('http://localhost:3000/history');
    await expect(page.getByText('Incident Logs')).toBeVisible();
  });

  test('emergency page should load', async ({ page }) => {
    await page.goto('http://localhost:3000/emergency?reason=Test');
    await expect(page.getByText('RAPID REQ')).toBeVisible();
    await expect(page.getByText('Aborting in')).toBeVisible();
  });
});
