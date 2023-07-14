import { test, expect } from "@playwright/test"

test.describe('Tips & Tricks Section', () => {
    test('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto("https://example.com/")
        console.log(testInfo)
        console.log(testInfo.expectedStatus)
    })
})

//npx playwright test --config=playwright.config.ts --project=Chromium --retries=3
// npx playwright test --config=playwright.config.ts --project=Chromium --headed