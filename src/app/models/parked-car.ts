export interface ParkedCar {
  licensePlate: string;
  spot: number;
  entry: Date;
  exit?: Date;
  timeParked?: string;
  cost?: string;
}
