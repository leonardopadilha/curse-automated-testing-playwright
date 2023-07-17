import { test, expect } from "@playwright/test"
import { getRandomNumber, getRandomString } from "../../data-helpers"

test.describe('Tips & Tricks Section', () => {
    test('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto("https://example.com/")
        //console.log(testInfo)
        //console.log(testInfo.expectedStatus)

        let newNumber = await getRandomNumber()
        let newString = await getRandomString()

        console.log(newNumber)
        console.log(newString)
    })

    test("Test Skipt Browser", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto("https://example.com/")
    })

    test("Test Fixme Browser", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        await page.goto("https://example.com/")
    })

    const people = ["Mike", "Judy", "Peter", "Elon", "Alice"]
    for (const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/")
            await page.type("#searchTerm", `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse Movement Simulation", async ({ page }) => {
        await page.goto("https://example.com/")
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, -100)
        await page.mouse.up()
    })

    test("Multiple Browser Tabs inside 1 Browser", async ({ browser }) => {
        const context = await browser.newContext()

        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto("https://example.com/")
        await page2.goto("https://example.com/")
        await page3.goto("https://example.com/")

        await page1.waitForTimeout(5000)
    })

    const themes = ["Playwright", "Playwright vs Cypress", "Playwright vs Selenium"]
    for (const theme of themes) {
        test.only(`Search in google ${theme}`, async ({ page }) => {
            await page.goto("https://www.google.com.br/")
            await page.type('textarea[name="q"]', theme)
            await page.keyboard.press('Enter')
            await page.waitForTimeout(3000)
        })
    }
})

//npx playwright test --config=playwright.config.ts --project=Chromium --retries=3
// npx playwright test --config=playwright.config.ts --project=Chromium --headed
// npx playwright open --device="Moto G4" wikipedia.org
// npx playwright pdf https://www.example.com my-file.pdf
//npx playwright screenshot --device="Moto G4" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone.png
// npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
// npx playwright open --timezone="Europe/Rome" --lang="it-IT" --geolocation="40.121, 10.123" google.com