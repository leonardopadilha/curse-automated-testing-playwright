import { test, expect } from "@playwright/test"

test.describe("Transfer Funds and Make Payments", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')

        await page.click("button[type='button']")

        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.getByLabel("Keep me signed in").check()
        await page.click(".form-actions > input")

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        await page.click('#transfer_funds_tab > a')
    })

    test("Transfer funds", async ({ page }) => {
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.type("#tf_amount", "500")
        await page.type("#tf_description", "Test message")
        await page.click("#btn_submit")

        const boardHeader = await page.locator("h2.board-header")
        await expect(boardHeader).toContainText("Verify")

        await page.click("#btn_submit")
        
        const message = await page.locator("div.alert-success")
        await expect(message).toContainText("You successfully submitted your transaction")
    })
})