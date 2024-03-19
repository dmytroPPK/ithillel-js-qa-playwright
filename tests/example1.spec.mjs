// @ts-check

import {test, expect} from '@playwright/test'

test.describe("Intro for qauto.forstudy.space",()=>{

  test.beforeEach((async ({page})=>{

    await page.goto('/');

  }))

  test('check title', async ({ page }) => {

    await expect(page).toHaveTitle("Hillel Qauto");

  });
  
  test('"Do more" is visible', async ({ page }) => {
    
    await expect(page.getByRole('heading', { name: 'Do more!' })).toBeVisible();

  });
})

