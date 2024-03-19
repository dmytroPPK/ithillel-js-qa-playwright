import { test } from '../../src/fixtures/pagesFixtures.mjs'
import { expect } from '@playwright/test'

test("Task - mocking user data", async ({garagePage})=>{
    
    let mockData = {
        name:'New_mock_name',
        lastName:'New_mock_lastName'
    }
    
    let profilePage = garagePage.getUserProfilePage();

    await profilePage.page.route('**/users/profile', async (route)=>{
        
        let response = await route.fetch();
        let data = await response.json();
        data.data.name = mockData.name;
        data.data.lastName = mockData.lastName;

        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(data),
        });

    });

    await profilePage.open();

    await expect(profilePage.userInfoParagraph, 'Check mock name').toContainText(mockData.name);
    await expect(profilePage.userInfoParagraph, 'Check mock lastName').toContainText(mockData.lastName);

    // await profilePage.page.pause();
    
    
});