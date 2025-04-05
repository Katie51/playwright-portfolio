import { test } from '@playwright/test';
import { HomePage } from '../pom/HomePage';
import { LoginPage } from '../pom/LoginPage';
import { testData } from '../data/testData';
import * as dotenv from 'dotenv';

dotenv.config();

test('should login successfully with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const username = testData.user.username;

    await homePage.navigate();
    await homePage.goToSignUpLoginPage();

    const email = process.env.LOGIN_EMAIL!;
    const password = process.env.LOGIN_PASSWORD!;
    
    await loginPage.fillLoginForm(email, password);
    await loginPage.verifyLoginSuccess(username);
   
});