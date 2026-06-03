import {APIRequestContext, APIResponse} from '@playwright/test';

export class KiotvietClient {
    constructor(
        private request: APIRequestContext,
        private token: string,
    
    ){}

    private getDefaultHeaders() {

        const headers = {
            'accept': 'application/json, text/plain, */*',
            'authorization': `Bearer ${this.token}`,
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


