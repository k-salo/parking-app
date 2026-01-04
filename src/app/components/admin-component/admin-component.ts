import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ParkingService } from '../../services/parking-service';
import { ParkingGarage } from '../../models/parking-garage';
import { ParkedCar } from '../../models/parked-car';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-component',
  imports: [DatePipe],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent implements OnInit, OnDestroy {
  parkingGarage!: ParkingGarage;
  intervalId?: number;
  exitedCars!: ParkedCar[];
  showExitedCars = false;

  constructor(public parkingService: ParkingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.parkingGarage = this.parkingService.parkingGarage;
    this.exitedCars = this.parkingService.exitedCars;
    this.intervalId = setInterval(() => this.updateTimeParked(), 1000);
  }

  private updateTimeParked(): void {
    this.parkingGarage.cars.forEach((car) => {
      car.timeParked = this.formatDuration(new Date().getTime() - car.entry.getTime());
      car.cost = this.parkingService.calculateCost(car.entry);
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  toggleExited(): void {
    this.showExitedCars = !this.showExitedCars;
  }
}
