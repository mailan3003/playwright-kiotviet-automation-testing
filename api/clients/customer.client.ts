import { APIRequestContext } from "@playwright/test";

export class ApiClient {
    constructor( private request: APIRequestContext) {}
    post (url: string, body: unknown){
        return this.request.post(url, {
            data: body,
            headers: {

                "accept": "application/json, text/plain, */*",

                "content-type": "application/json;charset=utf-8",

                "authorization": `Bearer ${process.env.KIOTVIET_TOKEN}`,

                "branchid": "333",

                "retailer": "testz18",

                "x-group-id": "18",

                "x-retailer-code": "testz18",

                "x-language": "vi-VN",

                "x-timezone": "Asia/Bangkok"
            }
        })
    }
}