import {test, expect, request} from '@playwright/test'

const baseURL = 'https://jsonplaceholder.typicode.com';

test.describe('User api', () => {
    test ('Get/users', async ({request}) => {
        //Gửi get request
        const response = await request.get(`${baseURL}/users`);

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const users = await response.json();
        //Assert cấu trúc data
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBeGreaterThan(0);

        //Assert cấu trúc của từng item
        const firstUser = users[0];
        expect(firstUser).toHaveProperty('id');
        expect(firstUser).toHaveProperty('name');
        expect(firstUser).toHaveProperty('email');
        expect(firstUser).toHaveProperty('address');
        expect(firstUser).toHaveProperty('phone');
        expect(firstUser).toHaveProperty('website');
        expect(firstUser).toHaveProperty('company');

    })

    test ('Get/id - Trả về theo user id', async ({request}) =>{
        const userId = 1;
        const userDetailsResponse = await request.get(`${baseURL}/users/${userId}`);

        expect(userDetailsResponse.status()).toBe(200);
        expect(userDetailsResponse.ok()).toBeTruthy();

        const userDetails = await userDetailsResponse.json();
        expect(userDetails).toHaveProperty('id', userId);
        expect(userDetails).toHaveProperty('name', 'Leanne Graham');
        expect(userDetails).toHaveProperty('username', 'Bret');
        expect(userDetails).toHaveProperty('email', 'Sincere@april.biz');
        expect(userDetails).toHaveProperty('phone', '1-770-736-8031 x56442');
        expect(userDetails).toHaveProperty('website', 'hildegard.org');

        const addressDetail = userDetails.address;
        expect(addressDetail).toHaveProperty('street', 'Kulas Light');
        expect(addressDetail).toHaveProperty('suite', 'Apt. 556');
        expect(addressDetail).toHaveProperty('city', 'Gwenborough');
        expect(addressDetail).toHaveProperty('zipcode', '92998-3874');
        expect(addressDetail).toHaveProperty('geo');
        expect(userDetails).toHaveProperty('company');
    })
})

test.describe('Commemts api', () => {
    test('Get/comments', async ({request}) => {
        //Assert status 200, response là array, có hơn 0 phần tử
        const response = await request.get(`${baseURL}/comments`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const comments = await response.json();
        expect(Array.isArray(comments)).toBe(true);
        expect(comments.length).toBeGreaterThan(0);
    })

    test('Get/comments/1 - Trả về comment theo postId', async ({request}) => {
        const postId = 1;
        const response = await request.get(`${baseURL}/comments/${postId}`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const comment = await response.json();
        expect(comment).toHaveProperty('postId', postId);
        expect(comment).toHaveProperty('id', 1);
        expect(comment).toHaveProperty('name', 'id labore ex et quam laborum');
        expect(comment).toHaveProperty('email', 'Eliseo@gardner.biz');
        expect(comment).toHaveProperty('body', 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium');

    })

    test('Get/comments?postId=1 - search comment theo postId', async ({request}) => {
        const postId = 1;
        const response = await request.get(`${baseURL}/comments?postId=${postId}`);
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const comments = await response.json();
        // Dùng Array.every() để check tất cả items
        expect(comments.every((c: any) => c.postId === 1)).toBe(true);
    })

})

test.describe('Posts api', () => {
    test('Post/posts', async ({request}) => {

        const dataTest = {
            title: 'Learn Playwright API',
            completed: false,
            userId: 1
        };
        const response = await request.post(`${baseURL}/todos`, {
            data: dataTest,
        });

        const responseData = await response.json();
        expect(responseData).toMatchObject({
            id: expect.any(Number),
            ...dataTest,
            completed: expect.any(Boolean),
        })

        expect(responseData.id).toBeGreaterThan(0);
        expect(responseData.title).toBe(dataTest.title);
        expect(responseData.completed).toBe(dataTest.completed);
        expect(responseData.userId).toBe(dataTest.userId);

    })

})