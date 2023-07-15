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
})

//npx playwright test --config=playwright.config.ts --project=Chromium --retries=3
// npx playwright test --config=playwright.config.ts --project=Chromium --headed
// npx playwright open --device="Moto G4" wikipedia.org
// npx playwright pdf https://www.example.com my-file.pdf
//npx playwright screenshot --device="Moto G4" --color-scheme=dark --wait-for-timeout=3000 twitter.com twitter-iphone.png
// npx playwright open --timezone="Europe/Rome" --lang="it-IT" google.com
// npx playwright open --timezone="Europe/Rome" --lang="it-IT" --geolocation="40.121, 10.123" google.com