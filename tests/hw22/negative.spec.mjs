import {test, expect} from '@playwright/test'
import { CarsController } from '../../src/controllers/CarsControllers.mjs'

test.describe("Negative test suite of cars controller", () => {

    let brandsID = null;
    let modelsID = null;

    test.beforeAll(async ({request}) => {

        const carsController = new CarsController(request);
        brandsID = (await carsController.getAllBrands()).json.data.map(brand=>brand.id);
        modelsID = (await carsController.getAllModels()).json.data.map(model=>model.id);

    });

    test("should not create car with not existed Brand ID", async ({request}) => {

        const carsController = new CarsController(request);
        
        let maxBrandId = Math.max(...brandsID);
        let modelId = modelsID[Math.floor(Math.random() * modelsID.length)];

        let addCarResponce = await carsController.addCar({
            carBrandId: ++maxBrandId,
            carModelId: modelId,
            mileage: 50,
        });

        expect(addCarResponce.status).toBe(404);
        expect(addCarResponce.json.message).toBe("Brand not found");

    });

    test("should not create car with not existed Model ID", async ({request}) => {

        const carsController = new CarsController(request);

        let brandId = brandsID[Math.floor(Math.random() * brandsID.length)];
        let maxModelId = Math.max(...modelsID);

        let addCarResponce = await carsController.addCar({
            carBrandId: brandId,
            carModelId: ++maxModelId,
            mileage: 50,
        });

        expect(addCarResponce.status).toBe(404);
        expect(addCarResponce.json.message).toBe("Model not found");

    });

    test("should not create car with invalid type of mileage", async ({request}) => {

        const carsController = new CarsController(request);
        
        let brandId = brandsID[Math.floor(Math.random() * brandsID.length)];
        let modelId = modelsID[Math.floor(Math.random() * modelsID.length)];

        let addCarResponce = await carsController.addCar({
            carBrandId: brandId,
            carModelId: modelId,
            mileage: "some text",
        });

        expect(addCarResponce.status).toBe(400);
        expect(addCarResponce.json.message).toBe("Invalid mileage type");

    });

    test("should not get brand with invalid brandId", async ({request}) => {

        const carsController = new CarsController(request);
        
        let maxBrandId = Math.max(...brandsID);

        let getBrandByIdResponce = await carsController.getBrandById(++maxBrandId);

        expect(getBrandByIdResponce.status).toBe(404);
        expect(getBrandByIdResponce.json.message).toBe("No car brands found with this id");

    });

    test("should not get model with invalid modelId", async ({request}) => {

        const carsController = new CarsController(request);
        
        let maxModelId = Math.max(...modelsID);

        let getModelByIdResponce = await carsController.getModelById(++maxModelId);

        expect(getModelByIdResponce.status).toBe(404);
        expect(getModelByIdResponce.json.message).toBe("No car models found with this id")

    })

});
