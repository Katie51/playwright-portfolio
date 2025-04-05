import { Page, expect } from '@playwright/test';

export class AccountCreatedPage {
    constructor(private page: Page) {}

    async verifyAccountCreated() {
        await expect(this.page).toHaveURL('/account_created');
        const confirmationMessage = await this.page.locator('h2[data-qa="account-created"]');
        await expect(confirmationMessage).toBeVisible();
    }
}