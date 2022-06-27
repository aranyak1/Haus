import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private showSearchBarOnHeader =new BehaviorSubject<boolean>(false);
  public showSearchBarOnHeader$ = this.showSearchBarOnHeader.asObservable();
  constructor() { 
  }
  hideHeaderSearchBar()
  {
    this.showSearchBarOnHeader.next(false);
  }
    showHeaderSearchBar()
  {
    this.showSearchBarOnHeader.next(true);
  }
}
