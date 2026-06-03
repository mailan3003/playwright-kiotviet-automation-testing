import {test as base, APIRequestContext} from '@playwright/test';
import axios from 'axios';

type ApiAuthFixtures = {
    apiToken: string;
}

type ApiAuthWorkerFixtures = {
    rawApiToken: string;
}

export const apiAuthTest = base.extend<ApiAuthFixtures, ApiAuthWorkerFixtures>({
    rawApiToken: [
        async ({}, use, workerInfo) => {
            try {
                const response = await axios.post(`${process.env.KIOTVIET_API_BASE_URL}/api/account/login?quan-ly=true`, {
                    model: {
                        RememberMe: true,
                        ShowCaptcha: false,
                        UserName: process.env.KIOTVIET_API_USERNAME,
                        Password: process.env.KIOTVIET_API_PASSWORD,
                        Language: 'vi-VN',
                        LatestBranchId: Number(process.env.KIOTVIET_BRANCH_ID), // 333
                    },
                    IsManageSide: true,
                    FingerPrintKey: process.env.KIOTVIET_FINGERPRINT_KEY,
                
                },
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'retailer': process.env.KIOTVIET_RETAILER,           // 'testz18' ← quan trọng nhất
                        'latestbranchid': process.env.KIOTVIET_BRANCH_ID,    // '333'
                        'fingerprintkey': process.env.KIOTVIET_FINGERPRINT_KEY,
                        'x-language': 'vi-VN',
                        'isusekvclient': '1',
                        'origin': `https://${process.env.KIOTVIET_RETAILER}.kiotviet.vn`,
                        'referer': `https://${process.env.KIOTVIET_RETAILER}.kiotviet.vn/`,
                    },
                }
            );

                console.log('Full response.data:', JSON.stringify(response.data, null, 2));
                const token = response.data.token;
                console.log('Extracted token:', token);
                process.env.KIOTVIET_TOKEN = token;  // set biến môi trường để các phần khác có thể dùng chung
                await use(token);

            } catch (error) {
                console.error('Error fetching API token:', error);
                throw error;
            }
        }, {scope: 'worker'}
    ],
    apiToken: async ({rawApiToken}, use) => {
        await use(rawApiToken);
    }
})

export {expect} from '@playwright/test';