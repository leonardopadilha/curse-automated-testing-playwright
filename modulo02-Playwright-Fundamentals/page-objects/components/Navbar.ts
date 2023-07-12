import { expect, Locator, Page } from "@playwright/test"
import { tabName } from "../Constants/Constants"

export class Navbar {
    readonly page: Page
    readonly accountSummary: Locator
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyMap: Locator
    readonly onlineStatements: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSummary = page.locator(tabName.ACCOUNT_SUMMARY)
        this.accountActivity = page.locator(tabName.ACCOUNT_ACTIVITY)
        this.transferFunds = page.locator(tabName.TRANSFER_FUNDS)
        this.payBills = page.locator(tabName.PAY_BILLS)
        this.myMoneyMap = page.locator(tabName.MY_MONEY_MAP)
        this.onlineStatements = page.locator(tabName.ONLINE_STATEMENTS)
    }

    async clickOnTab(menuOption) {
        switch (menuOption) {
            case tabName.ACCOUNT_SUMMARY:
                await this.accountSummary.click()
            break;

            case tabName.ACCOUNT_ACTIVITY:
                await this.accountActivity.click()
            break;

            case tabName.TRANSFER_FUNDS:
                await this.transferFunds.click()
            break;

            case tabName.PAY_BILLS:
                await this.payBills.click()
            break;

            case tabName.MY_MONEY_MAP:
                await this.myMoneyMap.click()
            break;

            case tabName.ONLINE_STATEMENTS:
                await this.onlineStatements.click()
            break;
        }
    }
}