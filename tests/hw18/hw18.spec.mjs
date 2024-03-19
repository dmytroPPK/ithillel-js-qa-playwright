import { test } from '../../src/fixtures/pagesFixtures.mjs'
import { expect } from '@playwright/test'

test("Task 1", async ({garagePage})=>{
    
    // await garagePage.open();
    // await garagePage.page.pause();
    
    let fuelPage = garagePage.getFuelPage();
    await fuelPage.open();

    await expect(fuelPage.page).toHaveScreenshot('no-car-empty-fuel.png', { maxDiffPixelRatio: 0.05 });

    await expect(fuelPage.addExpenseBtn).toBeDisabled();

    await expect(fuelPage.visibleText).toBeVisible();

    await expect(fuelPage.carImage).toBeVisible();

    await expect(fuelPage.carImage).toHaveScreenshot('no-car-car-image.png', { maxDiffPixelRatio: 0.05 });

    let carImageProps = await fuelPage.getCarImageProps();
    let paragraphProps = await fuelPage.getParagraphProps();

    expect(paragraphProps.y).toBeGreaterThan(carImageProps.y + carImageProps.height);
    
    await expect(fuelPage.garageLink).toBeVisible();

    await fuelPage.garageLink.click();

    expect(fuelPage.page.url()).toEqual(process.env.BASE_URL + garagePage.url);

    // await fuelPage.page.pause();
});

test("Task 2", async ({garagePage})=>{

    await garagePage.open();
    
    const addCarPopup1 = await garagePage.openAddCarPopup();
	await addCarPopup1.addCar('BMW', 'X5', 5);

    const addCarPopup2 = await garagePage.openAddCarPopup();
    await addCarPopup2.addCar('Audi', 'TT', 5);

    let fuelPage = garagePage.getFuelPage();
    await fuelPage.open();

    await expect(fuelPage.page).toHaveScreenshot('with-car-empty-fuel.png', { maxDiffPixelRatio: 0.05 });

    await expect(fuelPage.addExpenseBtn).toBeEnabled();

    await expect(fuelPage.visibleText).toBeVisible();

    await expect(fuelPage.pumpImage).toBeVisible();

    await expect(fuelPage.pumpImage).toHaveScreenshot('no-fuel-pump.png', { maxDiffPixelRatio: 0.05 });

    await expect(fuelPage.paragraphPumpText).toBeVisible();

    let pumpImageProps = await fuelPage.getPumpImageProps();
    let paragraphPumpProps = await fuelPage.getParagraphPumpProps();

    expect(paragraphPumpProps.y).toBeGreaterThan(pumpImageProps.y + pumpImageProps.height);

    const addExpencePopup = await fuelPage.openAddExpencePopup();

    await expect(addExpencePopup.container).toBeVisible();

    // await fuelPage.page.pause();

});

test("Task 3", async ({garagePage})=>{

    await garagePage.open();

    let fuelPage = garagePage.getFuelPage();
    await fuelPage.open();

    await expect(fuelPage.visibleText).toBeVisible();

    let carMenuList = await fuelPage.getCarMenuList();
    await expect(carMenuList).toBeVisible();

    await fuelPage.chooseCar('BMW X5')


    let addExpencePopUp = await fuelPage.openAddExpencePopup();

    await addExpencePopUp.addExpence(20,20,54);

    await expect(fuelPage.expenceTable.dateHeader).toBeVisible();
    await expect(fuelPage.expenceTable.mileageHeader).toBeVisible();
    await expect(fuelPage.expenceTable.litersUsedHeader).toBeVisible();
    await expect(fuelPage.expenceTable.totalCostHeader).toBeVisible();
    
    // await fuelPage.page.pause();

});


