import { ParkedCar } from './parked-car';

export interface ParkingGarage {
  name: string;
  capacity: number;
  cars: ParkedCar[];
}
