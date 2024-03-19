import {test, expect} from '@playwright/test'

const testUser = {
    fName:"User",
    lName: "Userovich",
    email:"water-test123@test.com",
    password:"UserWater123"
}

test.beforeEach(async({page})=>{
    await page.goto('/')
    await page.getByRole("button",{name:"Sign In"}).click()
    await page.locator('.modal-content').getByRole("button", {name:"Registration"}).click()
})


test.describe("Check name field validation",()=>{

    const names = {
        emptyValue:'',
        wrongLength:'U',
        wrongChars:'$^&'
    }
    
    test("Empty field", async({page}) => {
        await page.locator('#signupName').fill(names.emptyValue)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(testUser.password)
        await page.locator('#signupRepeatPassword').fill(testUser.password)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/Name required/)).toBeVisible()
        await expect(page.locator('#signupName'), 'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })

    test("Wrong length", async ({page}) => {
        await page.locator('#signupName').fill(names.wrongLength)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(testUser.password)
        await page.locator('#signupRepeatPassword').fill(testUser.password)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/to be from 2 to 20/)).toBeVisible()
        await expect(page.locator('#signupName'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })

    test("Wrong characters", async ({page}) => {
        await page.locator('#signupName').fill(names.wrongChars)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(testUser.password)
        await page.locator('#signupRepeatPassword').fill(testUser.password)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/Name is invalid/)).toBeVisible()
        await expect(page.locator('#signupName'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

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
        await page.locator('#signupName').fill(testUser.fName)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(passwds.emptyValue)
        await page.locator('#signupRepeatPassword').fill(passwds.emptyValue)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/Password required/)).toBeVisible()
        await expect(page.locator('#signupPassword'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })
    test("Wrong length", async({page}) => {
        await page.locator('#signupName').fill(testUser.fName)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(passwds.wrongLength)
        await page.locator('#signupRepeatPassword').fill(passwds.wrongLength)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/be from 8 to 15 characters long/)).toBeVisible()
        await expect(page.locator('#signupPassword'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })
    test("Missing one integer", async({page}) => {
        await page.locator('#signupName').fill(testUser.fName)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(passwds.missInteger)
        await page.locator('#signupRepeatPassword').fill(passwds.missInteger)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/at least one integer, one capital, and one small letter/)).toBeVisible()
        await expect(page.locator('#signupPassword'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })
    test("Missing one small letter", async({page}) => {
        await page.locator('#signupName').fill(testUser.fName)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(passwds.missSmallLetter)
        await page.locator('#signupRepeatPassword').fill(passwds.missSmallLetter)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/at least one integer, one capital, and one small letter/)).toBeVisible()
        await expect(page.locator('#signupPassword'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })
    test("Missing one capital letter", async({page}) => {
        await page.locator('#signupName').fill(testUser.fName)
        await page.locator('#signupLastName').fill(testUser.lName)
        await page.locator('#signupEmail').fill(testUser.email)
        await page.locator('#signupPassword').fill(passwds.missCapitalLetter)
        await page.locator('#signupRepeatPassword').fill(passwds.missCapitalLetter)

        await expect(page.getByRole('button', {name:/Register/})).toBeDisabled()
        await expect(page.getByText(/at least one integer, one capital, and one small letter/)).toBeVisible()
        await expect(page.locator('#signupPassword'),'Red border is active').toHaveCSS('border-color','rgb(220, 53, 69)')

    })
})