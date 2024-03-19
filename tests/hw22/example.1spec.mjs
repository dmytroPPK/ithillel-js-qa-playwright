import {test} from '@playwright/test'
import {Response} from '../../src/controllers/Response.mjs'
import { CarsController } from '../../src/controllers/CarsControllers.mjs';

test.skip("Example1", async({request, context})=>{

    // console.log(await request.storageState())
    // console.log("Example");

    // let responce = request.get("api/cars")
    console.log(process.env.AUTH_SID);
    console.log(await (await request.get("/api/cars")).json());

    let responce = await (new Response(await request.get("/api/cars"))).init()
    
    console.log('1',responce.json)
    console.log('2',responce.status)
    console.log('3',responce.headers)

});

test.skip("Example2", async({request, context})=>{

    // console.log(await request.storageState())
    // console.log("Example");

    // let responce = request.get("api/cars")

    const carsController = new CarsController(request);
    let allCars = (await carsController.getAllCars()).json

    console.log ('all cars', allCars)
    


});