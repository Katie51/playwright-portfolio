import { faker } from '@faker-js/faker';
import { Page, expect } from '@playwright/test';

export class SignupPage {
    constructor(private page: Page) { }

    async fillAccountInformation(name: string, email: string, password: string, day: number, month: number, year: number) {
        await expect(this.page).toHaveURL('/signup');
        await this.page.click('input[id="id_gender1"][value="Mr"]');
        await this.page.fill('input[id="name"]', name);

        const emailFieldValue = await this.page.inputValue('input[id="email"]');
        expect(emailFieldValue).toBe(email);

        await this.page.fill('input[id="password"]', password);
        await this.page.selectOption('select[id="days"]', { value: `${day}` });
        await this.page.selectOption('select[id="months"]', { value: `${month}` });
        await this.page.selectOption('select[id="years"]', { value: `${year}` });
        await this.page.check('input[name="newsletter"]');
        await this.page.check('input[id="optin"]');
        await this.page.fill('input[id="first_name"]', faker.person.fullName());
        await this.page.fill('input[id="last_name"]', faker.person.lastName());
        await this.page.fill('input[id="company"]', faker.company.name());
        await this.page.fill('input[id="address1"]', faker.location.streetAddress());
        await this.page.fill('input[id="address2"]', faker.location.secondaryAddress());

        const countries = ['India', 'United States', 'Canada', 'Australia', 'Israel', 'New Zealand', 'Singapore'];
        const randomCountry = faker.helpers.arrayElement(countries);

        await this.page.selectOption('select[id="country"]', { value: randomCountry });
        await this.page.fill('input[id="state"]', faker.location.state());
        await this.page.fill('input[id="city"]', faker.location.city());
        await this.page.fill('input[id="zipcode"]', faker.location.zipCode());
        await this.page.fill('input[id="mobile_number"]', faker.phone.number());
        await this.page.click('button[data-qa="create-account"]'); 
    }
}