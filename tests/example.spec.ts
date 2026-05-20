import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Checkout Flow', () => {
  test('Login, add Sauce Labs Bolt T-Shirt to cart and complete checkout', async ({ page }) => {

    // ── Step 1: Navigate to the site ──────────────────────────────────────
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // ── Step 2: Login ──────────────────────────────────────────────────────
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Verify we reached the inventory page
    await expect(page).toHaveURL(/inventory/);
    console.log('✅ Login successful');

    // ── Step 3: Find "Sauce Labs Bolt T-Shirt" and add to cart ────────────
    // Each inventory item has a data-test attribute for its add-to-cart button
    // The Bolt T-Shirt button id is: add-to-cart-sauce-labs-bolt-t-shirt
    const addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    console.log('✅ Sauce Labs Bolt T-Shirt added to cart');

    // Verify the cart badge shows 1 item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // ── Step 4: Go to cart ────────────────────────────────────────────────
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    console.log('✅ Cart page opened');

    // Verify the correct item is in the cart — use role-based locator to avoid strict-mode
    // violation (the product name appears as both a link and inner text node)
    await expect(page.getByRole('link', { name: 'Sauce Labs Bolt T-Shirt' })).toBeVisible();

    // ── Step 5: Proceed to checkout ───────────────────────────────────────
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
    console.log('✅ Checkout page opened');

    // ── Step 6: Fill checkout details ─────────────────────────────────────
    await page.locator('[data-test="firstName"]').fill('Nakeem QA');
    await page.locator('[data-test="lastName"]').fill('Learnings');
    await page.locator('[data-test="postalCode"]').fill('500001');
    console.log('✅ Checkout details filled');

    // ── Step 7: Click Continue ────────────────────────────────────────────
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/checkout-step-two/);
    console.log('✅ Checkout overview page loaded');

    // ── Step 8: Click Finish ──────────────────────────────────────────────
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete/);
    console.log('✅ Order placed successfully');

    // ── Step 9: Verify order confirmation ────────────────────────────────
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toBeVisible();
    console.log('✅ Order confirmation verified');
  });
});
