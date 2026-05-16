import {test, expect} from '@playwright/test'
test.describe('login', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/login')
    })

    test('Dang nhap thanh cong', async({page}) => {
        //Arrange
        await page.getByLabel('username').fill('tomsmith')
        await page.getByLabel('password').fill('SuperSecretPassword!')

        //Action
        await page.getByRole('button', {name: 'Login'}).click()

        //Assert
        await expect(page.getByText('You logged into a secure area!')).toBeVisible()
    })

    test ('Dang nhap that bai voi password sai', async({page}) => {
        await page.getByLabel('username').fill('tomsmith')
        await page.getByLabel('password').fill('wrongpassword')

        await page.getByRole('button', {name: 'Login'}).click()

        await expect(page.getByText('Your password is invalid!')).toBeVisible()
    })
})

test.describe('Verify checkbox', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/checkboxes')
    })

    test('Verify checkbox status in begining', async({page}) => {
        const checkbox = await page.getByRole('checkbox')
        await expect(checkbox.nth(0)).not.toBeChecked()
        await expect(checkbox.nth(1)).toBeChecked()
    })

    test('Check change status checkbox', async({page}) => {
        const checkbox = await page.getByRole('checkbox')

        await checkbox.nth(0).check()
        await checkbox.nth(1).uncheck()

        await expect(checkbox.nth(0)).toBeChecked()
        await expect(checkbox.nth(1)).not.toBeChecked()
    })
})

test.describe('forget password', () => {
    test.beforeEach(async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/forgot_password')
    })

    test('', async({page}) => {
        await page.getByLabel('E-mail').fill('test@example.com')

        await page.getByRole('button', {name: 'Retrieve password'}).click()

        await expect(page.getByRole('heading', {name: 'Your e-mail\'s been sent!'})).toBeVisible()
    })
})