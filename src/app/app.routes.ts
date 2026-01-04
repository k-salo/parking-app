import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin-component/admin-component';
import { HeroComponent } from './components/hero-component/hero-component';
import { ParkingLayoutComponent } from './components/parking-layout-component/parking-layout-component';

export const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'parking', component: ParkingLayoutComponent },
  { path: 'admin', component: AdminComponent }
];
