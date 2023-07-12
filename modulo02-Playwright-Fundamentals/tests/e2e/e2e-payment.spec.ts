import { test, expect } from "@playwright/test"

test.describe("New Payment", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')

        await page.click("button[type='button']")

        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.getByLabel("Keep me signed in").check()
        await page.click(".form-actions > input")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        await page.click('.nav-tabs > li:nth-child(4)')
    })

    test('Should send new pament', async ({ page }) => {
        await page.selectOption("#sp_payee", "apple")
        await page.click("#sp_get_payee_details")
        await page.waitForSelector("#sp_payee_details")
        await page.selectOption("#sp_account", "6")
        await page.type("#sp_amount", "5000")
        await page.type("#sp_date", "2021-11-09")
        await page.type("#sp_description", "some random message")
        await page.click("#pay_saved_payees")

        const message = await page.locator("#alert_content > span")
        await expect(message).toBeVisible()
        await expect(message).toContainText("The payment was successfully submitted.")
    })
})