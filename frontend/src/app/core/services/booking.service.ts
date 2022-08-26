import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private userId = '626bcae1055400d7fe01fd84'; // change after implementing authentication
  constructor(private apiService: ApiService) {}

  getBookingsByUserId() {
    return this.apiService.get(`bookings?userId=${this.userId}`);
  }

  createBooking(data: any) {
    data.userId = this.userId;
    return this.apiService.post('bookings', data);
  }
}
