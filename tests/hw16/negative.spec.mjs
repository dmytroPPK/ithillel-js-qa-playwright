import {test, expect} from '@playwright/test'
import { HomePage } from '../../src/pages/HomePage.mjs'

const testUser = {
    fName:"User",
    lName: "Userovich",
    email:"water-test123@test.com",
    password:"UserWater123"
}


test.describe("Check name field validation",()=>{

    const names = {
        emptyValue:'',
        wrongLength:'U',
        wrongChars:'$^&'
    }
    
    test("Empty field", async({page}) => {

        const homePage = new HomePage(page)
        await homePage.open()
        const loginForm = await homePage.openLoginForm()
        const signUpForm = await loginForm.openSignUpForm()

        await signUpForm.fnameInput.fill(names.emptyValue)
        await signUpForm.lnameInput.fill(testUser.lName)
        await signUpForm.emailInput.fill(testUser.email)
        await signUpForm.passwdInput.fill(testUser.password)
        await signUpForm.rePasswdInput.fill(testUser.password)

        await expect(signUpForm.registerBtn).toBeDisabled()
        await expect(signUpForm.fnameInput, 'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })

    
})

test.describe("Check password field validation",()=>{

    const passwds = {
        emptyValue:'',
        wrongLength:'Wat1',
        missInteger:'WaterSdt',
        missSmallLetter:'WATER1',
        missCapitalLetter:'water1'
    }

    test("Empty field", async({page}) => {
        
        const homePage = new HomePage(page)
        await homePage.open()
        const loginForm = await homePage.openLoginForm()
        const signUpForm = await loginForm.openSignUpForm()

        await signUpForm.fnameInput.fill(testUser.fName)
        await signUpForm.lnameInput.fill(testUser.lName)
        await signUpForm.emailInput.fill(testUser.email)
        await signUpForm.passwdInput.fill(passwds.emptyValue)
        await signUpForm.rePasswdInput.fill(passwds.emptyValue)

        await expect(signUpForm.registerBtn).toBeDisabled()
        await expect(signUpForm.passwdInput, 'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')


    })
    
})