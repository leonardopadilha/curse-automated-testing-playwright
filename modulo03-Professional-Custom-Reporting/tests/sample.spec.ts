import { test, expect } from "@playwright/test";

test("Basic test", async ({ page }) => {
    await page.goto("https://playwright.dev/")
    const title = page.locator(".navbar__inner .navbar__title")
    await expect(title).toHaveText("Playwright");
})

//npx playwright test --reporter=reporter.ts