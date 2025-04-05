import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; 

export class PaymentPage {
    constructor(private page: Page) {}

    async verifyOnPaymentPage() {
        await expect(this.page).toHaveURL('/payment');
    }

    async fillPaymentDetails() {
        await this.page.fill('[name="name_on_card"]', faker.person.fullName());
        await this.page.fill('[name="card_number"]', faker.finance.creditCardNumber('4111####1111####'));
        await this.page.fill('[name="cvc"]', faker.finance.creditCardCVV());
        await this.page.fill('[name="expiry_month"]', faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'));
        await this.page.fill('[name="expiry_year"]', faker.date.future().getFullYear().toString());
    }

    async confirmOrder() {
        await this.page.locator('[id="submit"]').click();
    }
}