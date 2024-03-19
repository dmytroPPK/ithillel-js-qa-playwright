import {test} from '../../src/fixtures/pagesFixtures.mjs'
import {GaragePage} from '../../src/pages/GaragePage.mjs'


test.skip("trulala", async({page})=>{
    await page.pause()
})

test("t1", async ({garagePage})=>{
    
    await garagePage.open()
    await garagePage.page.pause()
})