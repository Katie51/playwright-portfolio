import { test } from '@playwright/test';
import { HomePage } from '../pom/HomePage';
import { LoginPage } from '../pom/LoginPage';
import { ModalPage } from '../pom/ModalPage';
import { CartPage } from '../pom/CartPage';
import { CheckoutPage } from '../pom/CheckoutPage';
import { PaymentPage } from '../pom/PaymentPage';
import { OrderConfirmationPage } from '../pom/OrderConfirmationPage';
import { testData } from '../data/testData';
import * as dotenv from 'dotenv';

dotenv.config();

test('should complete checkout process successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const modalPage = new ModalPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    const email = process.env.LOGIN_EMAIL!;
    const password = process.env.LOGIN_PASSWORD!;
    const username = testData.user.username;
    const productId = testData.products[0].id;

    await homePage.navigate();
    await homePage.goToSignUpLoginPage();
    await loginPage.fillLoginForm(email, password);
    await loginPage.verifyLoginSuccess(username);
    await loginPage.addProductToCart(productId);
    await modalPage.verifyProductAdded();
    await modalPage.goToCart();
    await cartPage.verifyOnCartPage();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyOnCheckoutPage();
    await checkoutPage.placeOrder();
    await paymentPage.verifyOnPaymentPage();
    await paymentPage.fillPaymentDetails();
    await paymentPage.confirmOrder();
    await orderConfirmationPage.verifyOrderPlaced();
    await orderConfirmationPage.continueToHomePage();
});