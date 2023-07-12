import { test, expect } from "@playwright/test"

test.describe("Currency Exchange Form", () => {
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

    test("Should make currency exchange", async ({ page }) => {
        //await page.click("#tabs > ul > li:nth-child(3)")
        await page.click("text=Purchase Foreign Currency")
        await page.selectOption("#pc_currency", "Eurozone (euro)")

        const rate = await page.locator("#sp_sell_rate")
        await expect(rate).toContainText("1 euro (EUR)")

        await page.type("#pc_amount", "5000")
        await page.getByLabel("U.S. dollar (USD)").check()

        await page.click("#pc_calculate_costs")
        await page.waitForSelector("#pc_conversion_amount")

        await page.click("#purchase_cash")

        const message = await page.locator("#alert_content")
        await expect(message).toBeVisible()
        await expect(message).toContainText("Foreign currency cash was successfully purchased.")
    })
})