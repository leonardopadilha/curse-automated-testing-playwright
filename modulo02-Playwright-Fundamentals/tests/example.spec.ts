import { test, expect } from '@playwright/test'

test("Simple basic test", async ({ page }) => {
    await page.goto("https://example.com/")
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")
})

test("Clickin on Elements", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
})

test.skip("Selectors", async ({ page }) => {
    // text
    await page.click("text=some text")

    // Css Selectors
    await page.click('button')
    await page.click("#id")
    await page.click(".class")

    let taskName = "texto";
    let textoEsperado = await page.locator(`css=.task-item p >> text=${taskName}`);
    await expect(textoEsperado).toBeVisible();

    // Only visible Css Selector
    await page.click(".sumit-buttom:visible")

    // Combinations
    await page.click("#username .first")

    // Xpath
    await page.click("//button")

    const localizador = `xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`;
    const target = await page.locator(localizador)
})