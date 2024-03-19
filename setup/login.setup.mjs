import {test} from '@playwright/test'
import {HomePage} from '../src/pages/HomePage.mjs'

test("login as user", async ({page})=>{
    const homePage = new HomePage(page)
    await homePage.open()
    const loginForm = await homePage.openLoginForm()
    await loginForm.loginWithCredentials(process.env.USER_EMAIL, process.env.USER_PASS)
    await page.waitForSelector("app-garage")
    await page.context().storageState({
        path:"tests/store/user-garage.json"
    })
})