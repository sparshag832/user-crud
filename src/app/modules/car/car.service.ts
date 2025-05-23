import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/car.dto';

@Injectable()
export class CarService {
createCar(createReq: CreateCarDto) {
    const {name , model , year}=createReq
    const newCar = {
        id: Math.floor(Math.random() * 1000), // Simulate an auto-generated ID
        name:name,
        model:model,
        year:year
    };
    console.log('Car created:', newCar);
    return newCar.id;
}

    getAllCars(){
        return [
            {
                id: 1,
                name: 'Car 1',
                model: 'Model 1',
                year: 2020,
            },
            {
                id: 2,
                name: 'Car 2',
                model: 'Model 2',
                year: 2021,
            },
            {
                id: 3,
                name: 'Car 3',
                model: 'Model 3',
                year: 2022,
            },
        ];
    }
}
