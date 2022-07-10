import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUserById(id: string) {
    return this.apiService.get(`users/${id}`);
  }

  updateUserById(id: string,data:any)
  {
    return this.apiService.patch(`users/${id}`,data);
  }
}
