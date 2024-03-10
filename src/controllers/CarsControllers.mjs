import { BaseController } from "./BaseControllers.mjs";

export class CarsController extends BaseController{
    constructor(request){
        super(request);
        this.API_CARS = '/api/cars';
		this.API_CARS_ID = '/api/cars/{id}';
        this.API_CARS_BRANDS = '/api/cars/brands';
		this.API_CARS_BRANDS_ID = '/api/cars/brands/{id}';
        this.API_CARS_MODELS = '/api/cars/models';
        this.API_CARS_MODELS_ID = '/api/cars/models/{id}';

    }

    async addCar(car){
        return this.post(this.API_CARS, car);
    }

    async getAllCars(){
        return this.get(this.API_CARS);
    }

    async getCarById(id){
        return this.get(this.API_CARS_ID.replace("{id}", id));
    }

    async deleteCarById(id){
        return this.delete(this.API_CARS_ID.replace("{id}", id));
    }

    async getAllBrands(){
        return this.get(this.API_CARS_BRANDS);
    }

    async getBrandById(id){
        return this.get(this.API_CARS_BRANDS_ID.replace("{id}", id));
    }

    async getAllModels(){
        return this.get(this.API_CARS_MODELS);
    }

    async getModelById(id){
        return this.get(this.API_CARS_MODELS_ID.replace("{id}", id));
    }
}
