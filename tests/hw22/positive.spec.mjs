import {test, expect} from '@playwright/test'
import { CarsController } from '../../src/controllers/CarsControllers.mjs'

test.describe("Create cars", ()=>{

    let testTable = null;
        
    test.beforeAll(async({request})=>{

        const carsController = new CarsController(request);

        let allBrands = (await carsController.getAllBrands()).json.data;
        let allBrandsId = allBrands.map(brandObj => brandObj.id);

        let allModels = (await carsController.getAllModels()).json.data;
        let arrayOfModels = allModels.map(model => ({
            carBrandId: model.carBrandId,
            carModelId: model.id,
        }));

        testTable = arrayOfModels.filter(model => allBrandsId.includes(model.carBrandId));

        let allCars = (await carsController.getAllCars()).json.data;
        if (allCars.length) {
            await Promise.all(allCars.map(car => carsController.deleteCarById(car.id)));
        }

    });

    test("Should create cars for all brands combine with all models", async({request})=>{

        const carsController = new CarsController(request);

        for (const car of testTable) {
            await test.step(`Car model ${car.carModelId}, brand ${car.carBrandId} should be created`, async () => {
                const createCarResponse = await carsController.addCar({
                    carBrandId:car.carBrandId,
                    carModelId:car.carModelId,
                    mileage: 50,
                });
                expect(createCarResponse.status, `Car ${car.carModelId} is created `).toBe(201);
                expect(createCarResponse.json.status).toBe("ok");
            });
        }

    });

    test("Verify QNT of created cars for current user", async ({request}) => {

        const carsController = new CarsController(request);
        
        let lengthCreatedCars = (await carsController.getAllCars()).json.data.length;
        expect(lengthCreatedCars).toBe(testTable.length);

    });

});
