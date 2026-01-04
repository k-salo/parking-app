import { Injectable } from '@angular/core';
import { ParkingGarage } from '../models/parking-garage';
import { ParkedCar } from '../models/parked-car';
@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private _garage: ParkingGarage = {
    name: 'Parkihalli',
    capacity: 50,
    cars: [],
  };

  get parkingGarage() {
    return this._garage;
  }

  private _exitedCars: ParkedCar[] = [];

  get exitedCars() {
    return this._exitedCars;
  }

  parkCar(car: ParkedCar) {
    if (!this.isSpotAvailable(car.spot)) {
      return { success: false, message: 'Paikka on jo varattu' };
    }
    if (this._garage.cars.length >= this._garage.capacity) {
      return { success: false, message: 'Parkkihalli on täysi' };
    }
    car.licensePlate = car.licensePlate.toUpperCase();
    if (this._garage.cars.some((c) => c.licensePlate === car.licensePlate)) {
      return { success: false, message: 'Auto on jo pysäköity' };
    }
    this._garage.cars.push(car);
    return { success: true, message: 'Auto pysäköity onnistuneesti' };
  }

  isSpotAvailable(spot: number): boolean {
    return !this._garage.cars.some((c: ParkedCar) => c.spot === spot);
  }

  getSpots() {
    const parkedSpots = this._garage.cars.map((c: ParkedCar) => c.spot);
    const spots = Array.from({ length: this._garage.capacity }, (_, i) => {
      const index = i + 1;
      return {
        spot: index,
        isAvailable: !parkedSpots.includes(index),
      };
    });
    return spots;
  }

  exitCar(licensePlate: string) {
    const initialLength = this._garage.cars.length;
    const car = this._garage.cars.find(
      (c) => c.licensePlate.toUpperCase() === licensePlate.toUpperCase()
    );
    if (!car) {
      return { success: false, message: 'Autoa ei löytynyt' };
    }
    car.exit = new Date();
    car.cost = this.calculateCost(car.entry);
    this._garage.cars = this._garage.cars.filter(
      (c) => c.licensePlate.toUpperCase() !== licensePlate.toUpperCase()
    );
    this._exitedCars.push(car);
    return {
      success: this._garage.cars.length < initialLength,
      message:
        this._garage.cars.length < initialLength
          ? 'Poistuminen onnistui. Pysäköinti maksoi ' + car.cost
          : 'Autoa ei löytynyt',
    };
  }

  // First 3 hours, 50 snt/10 min, then 30 snt/10 min
  calculateCost(entry: Date) {
    const exit = new Date();
    const diffInMinutes = (exit.getTime() - entry.getTime()) / (1000 * 60);
    const tenMinPeriods = Math.max(1, Math.ceil(diffInMinutes / 10));
    const tenMinsIn3Hours = 18; // 3h = 180min = 18 × 10min
    let cost = 0;
    if (tenMinPeriods <= tenMinsIn3Hours) {
      cost = tenMinPeriods * 0.5;
    } else {
      const price3Hours = tenMinsIn3Hours * 0.5;
      const remainingPeriods = tenMinPeriods - tenMinsIn3Hours;
      cost = price3Hours + remainingPeriods * 0.3;
    }
    return cost.toFixed(2) + ' €';
  }
}
