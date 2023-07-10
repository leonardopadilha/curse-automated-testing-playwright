import { expect, Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly menuOtption: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator("button[type='button']")
        this.searchBox = page.locator("#searchTerm")
        this.menuOtption = page.locator("#feedback")
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/")
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }

    async searchFor(phrase: string) {
        await this.searchBox.type(phrase)
        await this.page.keyboard.press('Enter')
    }

    async clickOnFeedbackMenu() {
        await this.menuOtption.click()
    }
}