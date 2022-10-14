import { Car } from '../../cars/interfaces/car.interface';
import { v4 as uuid } from 'uuid';

export const CARS_SEED: Car[] = [
  {
    id: uuid(),
    brand: 'Ford',
    model: 'Mustang'
  },
  {
    id: uuid(),
    brand: 'Chevrolet',
    model: 'Camaro'
  }
];