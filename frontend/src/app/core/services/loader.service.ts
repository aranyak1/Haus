import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();
  constructor() { }

  startSpinner()
  {
    this.isLoading.next(true);
  }

  stopSpinner()
  {
    this.isLoading.next(false);
  }
}
