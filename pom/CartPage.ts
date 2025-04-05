import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) { }

    async verifyOnCartPage() {
        await expect(this.page).toHaveURL('/view_cart');
    }

    async proceedToCheckout() {
        await this.page.locator('text=Proceed To Checkout').click();
    }
}