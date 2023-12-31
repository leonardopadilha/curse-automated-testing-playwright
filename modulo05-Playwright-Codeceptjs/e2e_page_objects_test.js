//const LoginPage = require("./pages/LoginPage")

Feature("Zero Bank Application - E2E Tests with Before, After and Page Objects")

Before(({ I }) =>  {
    console.log('BEFORE HOOK')
    I.amOnPage('http://zero.webappsecurity.com/')
})

After(({ I }) => {
    console.log('AFTER HOOK')
})

Scenario("Login Test - Negative with Before, After and Page Objects", ({ I, LoginPage }) => {
    I.click('#signin_button')
    I.seeElement('#login_form')
    LoginPage.submitLogin('invalid username', 'invalid password')
    LoginPage.assertLoginFormIsVisible()

    I.seeElement('.alert-error')
})