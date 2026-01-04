import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking-service';
import { ParkedCar } from '../../models/parked-car';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { ParkingGarage } from '../../models/parking-garage';
import { ParkingSpot } from '../../models/parking-spot';

@Component({
  selector: 'app-entry-component',
  imports: [ReactiveFormsModule],
  templateUrl: './entry-component.html',
  styleUrl: './entry-component.css',
})
export class EntryComponent implements OnInit {

  parkingForm = new FormGroup({
    licensePlate: new FormControl('ABC-123', [Validators.required]),
  });
  garage!: ParkingGarage;
  spots!: ParkingSpot[];
  message?: { success: boolean, message: string };
  selectedSpot: number = 0;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.garage = this.parkingService.parkingGarage;
    this.spots = this.parkingService.getSpots();
  }

  selectSpot(spot: ParkingSpot) {
    this.selectedSpot = spot.spot;
  }

  onSubmit() {
    if (!this.parkingForm.valid) {
      this.message = { success: false, message: "Täytä kaikki kentät oikein" };
      return false;
    }
    if (!this.selectedSpot) {
      this.message = { success: false, message: "Valitse pysäköintipaikka" };
      return false;
    }
    const parkingFormValue = this.parkingForm.value;
    const car: ParkedCar = {
      licensePlate: parkingFormValue.licensePlate ?? '',
      spot: this.selectedSpot,
      entry: new Date()
    }
    const ret = this.parkingService.parkCar(car);
    if (ret.success) {
      this.message = { success: true, message: "Auto pysäköity onnistuneesti!" };
      this.spots = this.parkingService.getSpots();
    } else {
      this.message = { success: false, message: ret.message };
    }
    return true;
  }

}
