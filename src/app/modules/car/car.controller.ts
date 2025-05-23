import { Controller, Get, Post ,Body} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/car.dto';

@Controller('car')
export class CarController {
     constructor(private readonly _carService: CarService) {}

     @Post('/create')
     async createCar(@Body() model:CreateCarDto)
     {
        const result=await this._carService.createCar(model);
        return result
     }

     @Get('/all')
     async getAllCars(){
        const result=await this._carService.getAllCars();
        return result;
     }

}
