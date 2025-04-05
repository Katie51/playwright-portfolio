import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async fillSignupForm(name: string, email: string) {
        await expect(this.page).toHaveURL('/login');
        await this.page.fill('input[data-qa="signup-name"]', name);
        await this.page.fill('input[data-qa="signup-email"]', email);
        await this.page.click('button[data-qa="signup-button"]');
    }
    async fillLoginForm(email: string, password: string) {
        await this.page.fill('input[data-qa="login-email"]', email);
        await this.page.fill('input[data-qa="login-password"]', password);
        await this.page.click('button[data-qa="login-button"]');
    }
    async verifyLoginSuccess(username: string) {
        const successMessage = await this.page.getByText(`Logged in as ${username}`);
        await expect(successMessage).toBeVisible();
    }
    async addProductToCart(productId: string) {
        await this.page.locator(`[data-product-id="${productId}"]`).nth(0).click();
    }
    async logout() {
        await this.page.click('a[href="/logout"]');
    }
    async verifyLogoutSuccess() {
        await expect(this.page.locator('a[href="/login"]')).toBeVisible();
    }
}