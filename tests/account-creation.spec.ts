import { test } from '@playwright/test';
import { HomePage } from '../pom/HomePage';
import { LoginPage } from '../pom/LoginPage';
import { SignupPage } from '../pom/SignupPage';
import { AccountCreatedPage } from '../pom/AccountCreatedPage';
import { faker } from '@faker-js/faker';

test('should create a new account', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const signupPage = new SignupPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    // Test data
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const day = faker.number.int({ min: 1, max: 31 });
    const month = faker.number.int({ min: 1, max: 12 });
    const year = faker.number.int({ min: 1900, max: 2021 });

    // Test Steps
    await homePage.navigate();
    await homePage.goToSignUpLoginPage();
    await loginPage.fillSignupForm(name, email);
    await signupPage.fillAccountInformation(name, email, password, day, month, year);
    await accountCreatedPage.verifyAccountCreated();
});