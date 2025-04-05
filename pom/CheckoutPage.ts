import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async verifyOnCheckoutPage() {
        await expect(this.page).toHaveURL('/checkout');
    }

    async placeOrder() {
        await this.page.locator('text=Place Order').click();
    }
}