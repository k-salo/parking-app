import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLayoutComponent } from './parking-layout-component';

describe('ParkingLayoutComponent', () => {
  let component: ParkingLayoutComponent;
  let fixture: ComponentFixture<ParkingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParkingLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
