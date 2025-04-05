import { Page, expect } from '@playwright/test';

export class OrderConfirmationPage {
    constructor(private page: Page) {}

    async verifyOrderPlaced() {
        await expect(this.page.locator('[data-qa="order-placed"]')).toContainText('Order Placed!');
    }

    async continueToHomePage() {
        await this.page.locator('text=Continue').click();
    }
}