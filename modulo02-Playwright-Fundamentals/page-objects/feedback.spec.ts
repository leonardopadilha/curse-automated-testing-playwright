import { test } from "@playwright/test"
import { FeedbackPage } from "./Feedback-page"
import { HomePage } from "./Home-page"

test.describe('Feedback form with page objects', () => {
    let feedbackPage: FeedbackPage
    let homePage: HomePage

    let user = 'new user'
    let email = 'email@email.com' 
    let subject = 'new subject'
    let message = 'new message'

    test.beforeEach(async ({ page }) => {
        feedbackPage = new FeedbackPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
        await homePage.clickOnFeedbackMenu()

        await feedbackPage.fillInformation(user, email, subject, message)
    })

    test('Reset feedback form with page objects', async ({ page }) => {
    
        await feedbackPage.clickOnClear()
        await feedbackPage.resetForm()
        await feedbackPage.validatePermanenceOnFeedback()
    })

    test('Submit feedback form with page objects', async ({ page }) => {
        await feedbackPage.clickOnSendMessage()
        await feedbackPage.validateFeedbackSuccessfully(user)
    })


})