import { test } from '@playwright/test'

const payload = {
    email: process.env.API_USER_EMAIL,
    password: process.env.API_USER_PASS,
    remember: false,
};

test("Api User Login", async ({ request }) => {
    
    let responce = await request.post(`${process.env.API_URL}/auth/signin`, { data: payload });
    let sid = responce.headers()['set-cookie'].split(';')[0];
	process.env.AUTH_SID = sid;
    
})
