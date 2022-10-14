import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update.car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car #${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const car = this.findOneById(id);
    const index = this.cars.findIndex((car) => car.id === id);

    this.cars[index] = {
      ...car,
      ...updateCarDto,
    };

    return this.cars[index];
  }

  delete(id: string) {
    const index = this.cars.findIndex((car) => car.id === id);
    if (index === -1) throw new NotFoundException(`Car #${id} not found`);

    return this.cars.splice(index, 1);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
