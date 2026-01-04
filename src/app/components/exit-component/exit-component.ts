import { Component } from '@angular/core';
import { ParkingService } from '../../services/parking-service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-exit-component',
  imports: [ReactiveFormsModule],
  templateUrl: './exit-component.html',
  styleUrl: './exit-component.css',
})
export class ExitComponent {
  parkingForm = new FormGroup({
    licensePlate: new FormControl('ABC-123', [Validators.required]),
  });
  message?: { success: boolean, message: string };

  constructor(private parkingService: ParkingService) {}

  onSubmit() {
    const parkingFormValue = this.parkingForm.value;
    const licensePlate = parkingFormValue.licensePlate;
    if (licensePlate) {
      this.message = this.parkingService.exitCar(licensePlate);
    }
  }
}
