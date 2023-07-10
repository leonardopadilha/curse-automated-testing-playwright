import { expect, Locator, Page } from '@playwright/test';

export class FeedbackPage {
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly description: Locator
    readonly buttonClear: Locator
    readonly buttonSendMessage: Locator
    readonly textFeedbackPage: Locator
    readonly messageSuccess: Locator

    constructor(page: Page) {
        this.page = page
        this.nameInput = page.locator('input[name="name"]')
        this.emailInput = page.locator('input[placeholder="Your email address"]')
        this.subjectInput = page.locator('#subject')
        this.description = page.locator('#comment')
        this.buttonClear = page.locator('input[name="clear"]')
        this.buttonSendMessage = page.locator('input[value="Send Message"]')
        this.textFeedbackPage = page.locator('#description + p')
        this.messageSuccess = page.locator(".container:nth-child(3) .offset3")

    }

    async fillInformation(name: string, email: string, subject: string, message: string) {
        await this.nameInput.type(name)
        await this.emailInput.type(email)
        await this.subjectInput.type(subject)
        await this.description.type(message)
    }

    async clickOnClear() {
        await this.buttonClear.click()
    }

    async clickOnSendMessage() {
        await this.buttonSendMessage.click()
    }

    async resetForm() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.description).toBeEmpty()
    }

    async validatePermanenceOnFeedback() {
        await expect(this.textFeedbackPage).toBeVisible()
        await expect(this.textFeedbackPage).toContainText("IMPORTANT! This feedback facility is not secure")
    }

    async validateFeedbackSuccessfully(name: string) {
        await expect(this.messageSuccess).toBeVisible()
        await expect(this.messageSuccess).toContainText(`Thank you for your comments, ${name}`)
    }
}