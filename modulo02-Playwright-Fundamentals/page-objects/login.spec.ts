import { test, expect } from "@playwright/test"
import { LoginPage } from "./Login-page";
import { HomePage } from "./Home-page";

test.describe('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page);

        await homePage.visit()
    });

    test("Negative Scenario for login", async ({ page }) => {
        await homePage.clickOnSignIn()

        await page.getByLabel("Keep me signed in").check()
        //await page.click(".form-actions > input")

        await loginPage.login('wrongUser', 'wrongPassord')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage("Login and/or password are wrong.")
    })

    test("Positive Scenario for login", async ({ page }) => {
        await homePage.clickOnSignIn()

        await page.getByLabel("Keep me signed in").check()
        await loginPage.login('username','password')

        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
                
        const accountSumary = await page.locator("#account_summary_tab > a")
        await expect(accountSumary).toBeVisible()
        await expect(accountSumary).toContainText("Account Summary")
    })
});