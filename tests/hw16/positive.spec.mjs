import {test, expect} from '@playwright/test'
import { HomePage } from '../../src/pages/HomePage.mjs'
import { UserPage } from '../../src/pages/UserPage.mjs'


const testUser = {
    fName:"User",
    lName: "Userovich",
    email:"water-test123@test.com",
    password:"UserWater123"
}


test.describe("Sign Up, Login, Delete flow",()=>{
    
    test("user should be created", async ({page})=>{
        
        const homePage = new HomePage(page)
        await homePage.open()
        const loginForm = await homePage.openLoginForm()
        const signUpForm = await loginForm.openSignUpForm()

        await signUpForm.fnameInput.fill(testUser.fName)
        await signUpForm.lnameInput.fill(testUser.lName)
        await signUpForm.emailInput.fill(testUser.email)
        await signUpForm.passwdInput.fill(testUser.password)
        await signUpForm.rePasswdInput.fill(testUser.password)
        await signUpForm.registerBtn.click({timeout:4000})

        const userPage = new UserPage(page)

        await expect(userPage.validator.header,"h1 is visible").toBeVisible()
        await expect(userPage.validator.logOutLink,"Log out is visible").toBeVisible()
        
    })

    test("user should be logged in", async ({page})=>{

        const homePage = new HomePage(page)
        await homePage.open()
        const loginForm = await homePage.openLoginForm()

        await loginForm.emailInput.fill(testUser.email)
        await loginForm.passwdInput.fill(testUser.password)
        await loginForm.loginBtn.click()

        const userPage = new UserPage(page)
        await expect(userPage.validator.profileButton,"Profile button is visible").toBeVisible()

    })

    test("user should be deleled", async ({page})=>{
        
        const homePage = new HomePage(page)
        await homePage.open()
        const loginForm = await homePage.openLoginForm()

        await loginForm.emailInput.fill(testUser.email)
        await loginForm.passwdInput.fill(testUser.password)
        await loginForm.loginBtn.click()

        const userPage = new UserPage(page)
        await userPage.settingLink.click()
        await userPage.removeMyAccountBtn.click()
        await userPage.removeBtn.click()

        await expect.soft(page,"Correct url").toHaveURL("https://qauto.forstudy.space/")
        await expect.soft(homePage.header.signInBtn,'Sign In is visible').toBeVisible()
        
    })
})