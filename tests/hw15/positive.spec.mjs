import {test, expect} from '@playwright/test'

const testUser = {
    fName:"User",
    lName: "Userovich",
    email:"water-test123@test.com",
    password:"UserWater123"
}


test.describe("Sign Up, Login, Delete flow",()=>{

    test.beforeEach(async({page})=>{
        await page.goto('/')
    })
    
    test("user should be created", async ({page})=>{
        const signInBtn = page.getByRole("button",{name:"Sign In"})
        await signInBtn.click()

        const regBtn = page.locator('.modal-content').getByRole("button", {name:"Registration"})
        await regBtn.click()
        
        const fnameInput = page.locator("#signupName")
        const lnameInput = page.locator("#signupLastName")
        const emailInput = page.locator("#signupEmail")
        const passwdInput = page.locator("#signupPassword")
        const rePasswdInput = page.locator("#signupRepeatPassword")
        const regFormBtn = page.getByRole('button', {name:/Register/})

        await fnameInput.fill(testUser.fName)
        await lnameInput.fill(testUser.lName)
        await emailInput.fill(testUser.email)
        await passwdInput.fill(testUser.password)
        await rePasswdInput.fill(testUser.password)
        await regFormBtn.click({timeout:2000})

        await expect(page.getByRole("heading",{name:"Garage"}),"h1 is visible").toBeVisible()
        await expect(page.getByText('Log out'),"Log out is visible").toBeVisible()
        
    })

    test("user should be logged in", async ({page})=>{
        await page.getByRole("button",{name:"Sign In"}).click()

        await page.locator('id=signinEmail').fill(testUser.email)
        await page.locator('id=signinPassword').fill(testUser.password)
        await page.getByRole('button',{name:'Login'}).click()

        await expect(page.getByRole("button",{name:" My profile "}),"Profile button is visible").toBeVisible()


    })

    test("user should be deleled", async ({page})=>{
        await page.getByRole("button",{name:"Sign In"}).click()

        await page.locator('id=signinEmail').fill(testUser.email)
        await page.locator('id=signinPassword').fill(testUser.password)
        await page.getByRole('button',{name:'Login'}).click()

        await page.getByRole('link', {name:/ Settings/}).click()

        await page.getByRole('button', {name:/Remove my account/}).click()

        await page.getByRole('button', {name:/Remove/}).click()

        await expect.soft(page,"Correct url").toHaveURL("https://qauto.forstudy.space/")

        await expect.soft(page.getByRole("button",{name:"Sign In"}),'Sign In is visible').toBeVisible()

        
    })
})