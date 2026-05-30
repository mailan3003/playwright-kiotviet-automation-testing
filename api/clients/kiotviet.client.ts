import {APIRequestContext, APIResponse} from '@playwright/test';

export class KiotvietClient {
    constructor(private request: APIRequestContext){}

    private getDefaultHeaders() {

        const headers = {
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${process.env.KIOTVIET_TOKEN}`,
            'branchid': process.env.KIOTVIET_BRANCH_ID!,
            'retailer': process.env.KIOTVIET_RETAILER!,
            'x-retailer-code': process.env.KIOTVIET_RETAILER!,
            'x-group-id': process.env.KIOTVIET_GROUP_ID!,
            'x-language': 'vi-VN',
            'x-timezone': 'Asia/Bangkok',
            'isusekvclient': '1',
            'origin': process.env.KIOTVIET_FRONTEND_URL!,
            'referer': `${process.env.KIOTVIET_FRONTEND_URL}/`,
            };

            // 🔍 LOG headers — check env có load không
            console.log('\n========== 🔑 HEADERS ==========');
            Object.entries(headers).forEach(([k, v]) => {
            // Mask token cho an toàn
            const displayValue = k === 'authorization'
                ? (v.includes('undefined') ? '❌ UNDEFINED' : `Bearer ${v.substring(7, 30)}...`)
                : v;
            console.log(`  ${k}:`, displayValue);
            });
            console.log('================================\n');

        return {
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${process.env.KIOTVIET_TOKEN}`,
            'branchid': process.env.KIOTVIET_BRANCH_ID!,
            'retailer': process.env.KIOTVIET_RETAILER!,
            'x-retailer-code': process.env.KIOTVIET_RETAILER!,
            'x-group-id': process.env.KIOTVIET_GROUP_ID!,
            'x-language': 'vi-VN',
            'x-timezone': 'Asia/Bangkok',
            'isusekvclient': '1',
            'origin': process.env.KIOTVIET_FRONTEND_URL!,
            'referer': `${process.env.KIOTVIET_FRONTEND_URL}/`,
        };
    }

    async postMultipart(endpoint: string, formData: Record<string, string>): Promise <APIResponse> {
        return this.request.post(endpoint, {
            headers: this.getDefaultHeaders(),
            multipart: formData,
        });
    }

    async get(endpoint: string): Promise <APIResponse> {
        return this.request.get(endpoint, {
            headers: this.getDefaultHeaders(),
        })
    }

    async delete(endpoint: string): Promise <APIResponse> {
        return this.request.delete(endpoint, {
            headers: this.getDefaultHeaders(),
        })
    }

}


