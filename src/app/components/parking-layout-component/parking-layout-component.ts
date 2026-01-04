import { Component } from '@angular/core';
import { EntryComponent } from '../entry-component/entry-component';
import { ExitComponent } from '../exit-component/exit-component';

@Component({
  selector: 'app-parking-layout-component',
  imports: [EntryComponent, ExitComponent],
  templateUrl: './parking-layout-component.html',
  styleUrl: './parking-layout-component.css',
})
export class ParkingLayoutComponent {

}
