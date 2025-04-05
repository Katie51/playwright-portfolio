import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('/');
    }

    async goToSignUpLoginPage() {
        await this.page.click('a[href="/login"]'); 
    }
}