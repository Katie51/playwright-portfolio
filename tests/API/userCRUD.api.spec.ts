import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://automationexercise.com/api';

let testUser;

test.describe('User Account CRUD API Tests', () => {

    test.beforeAll(async ({ request }) => {
        testUser = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            title: faker.helpers.arrayElement(['Mr', 'Mrs', 'Miss']),
            birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
            birth_month: faker.date.month(),
            birth_year: faker.number.int({ min: 1980, max: 2005 }).toString(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: 'United States',
            zipcode: faker.location.zipCode(),
            state: faker.location.state({ abbreviated: true }),
            city: faker.location.city(),
            mobile_number: faker.string.numeric(10)
        };

        const response = await request.post(`${baseUrl}/createAccount`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            form: testUser
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('User created!');
    });

    test('Get User Details by Email', async ({ request }) => {
        const response = await request.get(`${baseUrl}/getUserDetailByEmail`, {
            params: { email: testUser.email }
        });
    
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toMatchObject({
            user: {
                name: testUser.name,
                email: testUser.email
            }
        });
    });    

    test('Update User Account', async ({ request }) => {
        const updatedData = { ...testUser, company: 'Updated Company' };
        const response = await request.put(`${baseUrl}/updateAccount`, {
            form: updatedData
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('User updated!');
    });

    test('Delete User Account', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/deleteAccount`, {
            form: {
                email: testUser.email,
                password: testUser.password
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe('Account deleted!');
    });
});