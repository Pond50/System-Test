import { test, expect } from "@playwright/test";

test("ST-05: เรียงสินค้าตามราคา Low to High ได้ถูกต้อง", async ({ page }) => {
  // =====================================================

  // Login

  // =====================================================

  await page.goto("/");

  await page.locator("#user-name").fill("standard_user");

  await page.locator("#password").fill("secret_sauce");

  await page.locator("#login-button").click();

  await expect(page).toHaveURL(/inventory\.html/);

  // =====================================================

  // Inventory

  // =====================================================

  await expect(page.locator(".inventory_item")).toHaveCount(6);

  // =====================================================

  // Select Price Low to High

  // =====================================================

  await page

    .locator('[data-test="product-sort-container"]')

    .selectOption("lohi");

  await expect(page.locator('[data-test="active-option"]')).toHaveText(
    "Price (low to high)",
  );

  // =====================================================

  // Verify prices are ascending

  // =====================================================

  const priceTexts = await page

    .locator(".inventory_item_price")

    .allTextContents();

  const prices = priceTexts.map((text) => Number(text.replace("$", "")));

  expect(prices).toHaveLength(6);

  const sortedPrices = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sortedPrices);
});
