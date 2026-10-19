import { test, expect } from '@playwright/test';

test.describe('BrewFlow POS E2E Flow', () => {
  test('Customer menu, table selection, cart and checkout flow', async ({ page }) => {
    // 1. Visit Menu
    await page.goto('http://localhost:5173/menu');

    // 2. Table selection modal should appear
    const tableModal = page.locator('text=Pilih Meja');
    await expect(tableModal).toBeVisible();

    // 3. Pick first table option
    const firstTableBtn = page.locator('button').filter({ hasText: 'Meja A-01' }).first();
    await firstTableBtn.click();

    // Click continue to menu button
    const continueBtn = page.locator('button', { hasText: 'Continue to Menu' });
    await continueBtn.click();

    // 4. Add product to cart
    // Click on the first product card or 'Add to Order' button
    const firstProduct = page.locator('article').first();
    await firstProduct.click();

    // Customization modal opens, click 'Tambah ke Pesanan'
    const addToCartBtn = page.locator('button', { hasText: /Tambah ke Pesanan|Add to Cart/i });
    if (await addToCartBtn.isVisible()) {
      await addToCartBtn.click();
    }

    // 5. Verify floating cart bar appears
    const floatingCart = page.locator('text=item');
    await expect(floatingCart).toBeVisible();

    // 6. Navigate to cart
    await page.locator('button', { hasText: 'View Cart' }).click();
    await expect(page).toHaveURL(/\/cart/);

    // 7. Proceed to checkout order flow
    const checkoutBtn = page.locator('button', { hasText: /Proceed to Checkout|Buat Pesanan|Checkout/i });
    if (await checkoutBtn.isVisible()) {
      await checkoutBtn.click();
      await expect(page).toHaveURL(/\/order/);
    }
  });

  test('Owner dashboard and product management', async ({ page }) => {
    await page.goto('http://localhost:5173/owner');

    // Check statistics and product table
    await expect(page.locator('text=Total Revenue')).toBeVisible();
    await expect(page.locator('text=Products')).toBeVisible();

    // Check table management section
    await expect(page.locator('text=Table & QR Code Management')).toBeVisible();
  });

  test('Public pickup display queue', async ({ page }) => {
    await page.goto('http://localhost:5173/display');

    // Check pickup display elements
    await expect(page.locator('text=Sedang diproses')).toBeVisible();
    await expect(page.locator('text=Siap diambil')).toBeVisible();
  });
});
