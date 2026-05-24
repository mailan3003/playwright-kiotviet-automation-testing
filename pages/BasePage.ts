import {Page} from '@playwright/test';

export class BasePage {
    constructor (protected page: Page){

    }

    async waitForPageLoad(): Promise <void>{
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitforvisible(selector: string): Promise<void>{
        await this.page.waitForSelector(selector, {state: 'visible'});
    }

    getCurrentURL(): string {
        return this.page.url();
    }

    async waitForURL(url: string | RegExp): Promise<void> {
        await this.page.waitForURL(url);
    }

    async takeScreenshot(path: string): Promise<void> {
        await this.page.screenshot({ path });
    }
}