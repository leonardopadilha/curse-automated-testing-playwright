import { test, expect } from "@playwright/test"

test.describe('Login / Logout Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
    });

    test("Negative Scenario for login", async ({ page }) => {
        await page.click("button[type='button']")

        await page.type("#user_login", "wrongUser")
        await page.type("#user_password", "wrongPassord")
        await page.getByLabel("Keep me signed in").check()
        await page.click(".form-actions > input")

        const message = await page.locator(".alert-error")
        await expect(message).toContainText("Login and/or password are wrong.")
    })

    test("Positive Scenario for login", async ({ page }) => {
        await page.click("button[type='button']")

        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.getByLabel("Keep me signed in").check()
        await page.click(".form-actions > input")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        
        const accountSumary = await page.locator("#account_summary_tab > a")
        await expect(accountSumary).toBeVisible()
        await expect(accountSumary).toContainText("Account Summary")
    })
});