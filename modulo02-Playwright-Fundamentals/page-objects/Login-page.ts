import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage extends AbstractPage {
    //readonly page: Page
    readonly userNameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    constructor(page: Page) {
        //this.page = page
        super(page)
        this.userNameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitButton = page.locator("text=Sign in")
        this.errorMessage = page.locator(".alert-error")
        this.loginForm = page.locator('#login_form')
    }

    async erroPage() {
        await this.page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
    }

    async login(userName: string, password: string) {
        await this.userNameInput.type(userName)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    }

    async assertErrorMessage(message: string) {
        await expect(this.errorMessage).toContainText(message)
    }

    async snapshotLoginForm() {
        await expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        await expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png')
    }
}