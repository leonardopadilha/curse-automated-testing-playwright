const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { LoginPage } = require("../page-objects/login-page")

const loginPage = new LoginPage()

Given("I visit a login page with page objects", async function () {
    await loginPage.navigateToLoginSreen()
})

When("I fill the login form valid credentials with page objects", async function () {
    await loginPage.submitLoginForm()
})

Then("I should see the home page with page objects", async function() {
    await loginPage.assertUserIsLoggedIn()
})