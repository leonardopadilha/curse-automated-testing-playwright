import { test, expect } from "@playwright/test"

test.describe("Filter Transactions", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')

        await page.click("button[type='button']")

        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.getByLabel("Keep me signed in").check()
        await page.click(".form-actions > input")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        await page.click('.nav-tabs > li:nth-child(2)')
    })

    test("Verify the results for each account", async ({ page }) => {
        await page.selectOption("#aa_accountId", "2")

        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption("#aa_accountId", "4")
        const loadAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loadAccount).toHaveCount(2)

        await page.selectOption("#aa_accountId", "6")
        const noResults = await page.locator(".well")
        await expect(noResults).toContainText("No results.")

    })
})