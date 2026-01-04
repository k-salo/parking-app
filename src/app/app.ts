import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  url = location.href;
  isAdmin = false;

  constructor(public router: Router){
    if (this.url.includes('/admin')) {
      this.isAdmin = true;
    }
  }
}
