import {test, expect} from '@playwright/test';

test.describe('Bài 1 - Dialog cơ bản', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    })

    test('JS Alert → accept → hiển thị message thành công', async ({page}) => {
        // dang ky handle truoc khi click vao button
        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe('I am a JS Alert');
            await dialog.accept();
        });
        
        //trigger ra dialog
        await page.getByRole('button', {name: 'Click for JS Alert'}).click();

        // kiem tra message sau khi accept
        const result = await page.locator('#result').textContent();
        expect(result).toBe('You successfully clicked an alert');

    });

    test('JS Confirm → cancel → hiển thị message cancel', async ({page}) => {
        // dang ky handle truoc khi click vao button
        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toBe('I am a JS Confirm');
            await dialog.dismiss();
        });

        //trigger ra dialog
        await page.getByRole('button', {name: 'Click for JS Confirm'}).click();

        // kiem tra message sau khi dismiss
        const result = await page.locator('#result').textContent();
        expect(result).toBe('You clicked: Cancel');
    });

    test('JS Prompt → nhập text → accept → hiển thị message với text đã nhập', async ({page}) => {
        const inputText = 'Lan QA';
        // dang ky handle truoc khi click vao button
        page.once('dialog', async (dialog) => {
            expect(dialog.type()).toBe('prompt');
            expect(dialog.message()).toBe('I am a JS prompt');
            await dialog.accept(inputText);
        });

        //trigger ra dialog
        await page.getByRole('button', {name: 'Click for JS Prompt'}).click();

        // kiem tra message sau khi accept
        const result = await page.locator('#result').textContent();
        expect(result).toBe('You entered: ' + inputText);
    })
})

test.describe('Bài 2 - iFrame', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://letcode.in/frame');
    })

    test('Nhập text vào iFrame và kiểm tra', async ({page}) => {
        // switch vào iFrame
        const frame = page.frameLocator('#firstFr');
        // clear text mặc định trong iFrame
        await frame.locator('input[placeholder="Enter name"]').fill('Nguyen');
        await frame.locator('input[placeholder="Enter email"]').fill('Lan');

        // lấy text trong iFrame ra để verify
        const result = await frame.locator('p.title.has-text-info').textContent();
        expect(result).toBe('You have entered Nguyen Lan');        

    })

})

test.describe('Bài 3 - file upload', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
    })

    test('Upload file', async ({page}) => {
        const filePath = 'D:\\LAN\\AutoTest\\playwright-demo\\tests\\Demo\\avt.jpg';
        await page.setInputFiles('#file-upload', filePath);
        await page.click('#file-submit');

        const result = await page.locator('.example').textContent();
        expect(result).toContain('File Uploaded!');
        const uploadedFilename = await page.locator('#uploaded-files').textContent();
        expect(uploadedFilename).toContain('avt.jpg');

    })

})