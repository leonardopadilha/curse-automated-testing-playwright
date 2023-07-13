import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/Home-page"
import { LoginPage } from "../../page-objects/Login-page"

test.describe("Login page Visual Tests", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
    })

    test("Login Form", async ({ page }) => {
        await loginPage.snapshotLoginForm()
    })

    test("Login Error Message", async ({ page }) => {
        await loginPage.login("some user", "some password")
        await loginPage.snapshotErrorMessage()
    })
})

//npx playwright test --config=visual.config.ts --project=Chromium
//npx playwright test --config=visual.config.ts --project=chromium --update-snapshots