import { test, expect } from "@playwright/test"

test.describe("Feedback form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#feedback")
    })

    test("Reset feedback form", async ({ page }) => {
        const message = "Some nice comment about the application"

        await page.type('input[name="name"]', 'user')
        await page.type('input[placeholder="Your email address"]', 'email@email.com')
        await page.type('#subject', 'new user')
        await page.type('#comment', message)

        await page.click('input[name="clear"]')
        
        const nameInput = await page.locator('input[name="name"]')
        const commentInput = await page.locator('#comment')
        await expect(nameInput).toBeVisible()
        await expect(commentInput).toBeVisible()
    })

    test("Submit feedback form", async ({ page }) => {
        const message = "Some nice comment about the application"

        await page.type('input[name="name"]', 'user')
        await page.type('input[placeholder="Your email address"]', 'email@email.com')
        await page.type('#subject', 'new user')
        await page.type('#comment', message)

        await page.click('input[value="Send Message"]')

        await page.waitForSelector("#feedback-title")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/sendFeedback.html")
    })
})