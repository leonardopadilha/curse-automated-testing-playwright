import { test } from "@playwright/test"
import { tabName } from "./Constants/Constants"
import { LoginPage } from "./Login-page"
import { HomePage } from "./Home-page"
import { Navbar } from "./components/Navbar"
import { PaymentPage } from "./Payment-Page"

test.describe("New Payment", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    let navBar: Navbar
    let paymentPage: PaymentPage

    let user = 'username'
    let password = 'password' 

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        paymentPage = new PaymentPage(page)
        navBar = new Navbar(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login(user, password)
        await loginPage.erroPage()
        await navBar.clickOnTab(tabName.PAY_BILLS)
    })

    test('Should send new pament', async ({ page }) => {
        await paymentPage.createPayment()
        await paymentPage.assertSuccessMessage()
    })
})