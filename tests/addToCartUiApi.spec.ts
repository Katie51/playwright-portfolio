import { test, expect } from '@playwright/test';
import { searchProduct } from '../api/apiHelpers';
import { HomePage } from '../pom/HomePage';
import { ModalPage } from '../pom/ModalPage';
import { CartPageApi } from '../pomApi/CartPageApi';
import { CartPage } from '../pom/CartPage';  
import { testData } from '../dataApi/testData';

test('Add Product to Cart - API Search + UI Flow', async ({ request, page }) => {
    const homePage = new HomePage(page);   
    const modalPage = new ModalPage(page);
    const cartPage = new CartPage(page);
    const cartPageApi = new CartPageApi(page);

    await homePage.navigate();

    const searchedProduct = await searchProduct(request, testData.productToSearch);

    await cartPageApi.addProductToCartApiTest(searchedProduct.id);  
    await modalPage.verifyProductAdded();
    await modalPage.goToCart();
    await cartPage.verifyOnCartPage();
    await cartPageApi.verifyProductInCartApiTest(searchedProduct.name);  
});