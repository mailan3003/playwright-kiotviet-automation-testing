import {test, expect, request} from '@playwright/test'

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('PUT VÀ DELETE', () => {
    // let authContext: APIRequestContext;
    // let accessToken: string;
    // test.beforeAll(async ({request}) => {
    //     const loginRequest = await request.post(`${BASE_URL}/login`, {
    //         data: {
    //             email: 'eve.holt@reqres.in',
    //             password: 'cityslicka',
    //         }
    //     })
    //     expect(loginRequest.status()).toBe(200);

    //     const loginBody = await loginRequest.json();
    //     expect(loginBody).toHaveProperty('token');
    //     accessToken = loginBody.token;

    //     // tạo context riêng với token, áp dụng cho các test bên dưới
    //     authContext = await playwrightRequest.newContext({
    //         baseURL: BASE_URL,
    //         extraHTTPHeaders: {
    //     'Authorization': `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json',
    //   },

    //     })
    // })

    // test.afterAll(async () => {
    //     await authContext.dispose();
    // })

    test('Put api', async ({ request }) => {
    const updateData = {
        title: 'Nguyen Van A',
        body: 'Senior QA Engineer',
        userId: 1,
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
        data: updateData,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.title).toBe(updateData.title);
    expect(responseBody.body).toBe(updateData.body);
    expect(responseBody.id).toBe(1);
    });

    test('patch api', async ({request}) => {
        const updateData = {
            title: 'Nguyen Van A update title only',
        };

        const response = await request.patch(`${BASE_URL}/posts/1`, {
            data: updateData
        })

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.title).toBe(updateData.title);
        expect(responseBody.body).toBe('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')
    })

    test('delete api', async ({request}) => {

        const response = await request.delete(`${BASE_URL}/posts/1`);
        expect(response.status()).toBe(200);
        })
})