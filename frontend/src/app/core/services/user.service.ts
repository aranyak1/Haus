import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userId = null;
  public userName = 'Abc';
  public userLoggedIn = new BehaviorSubject<Boolean>(false);
  constructor(private apiService: ApiService) {
    console.log('userservice', this.userId);
  }

  getUserById(id: string) {
    return this.apiService.get(`users/${id}`);
  }

  updateUserById(id: string, data: any) {
    return this.apiService.patch(`users/${id}`, data);
  }

  loginUser(data: any) {
    return this.apiService.post(`users/login`, data, {
      observe: 'response',
      withCredentials: true,
    });
  }

  signupUser(data: any) {
    return this.apiService.post(`users/signup`, data, {
      observe: 'response',
      withCredentials: true,
    });
  }

  logoutUser() {
        return this.apiService.get(`users/logout`);
  }
}
