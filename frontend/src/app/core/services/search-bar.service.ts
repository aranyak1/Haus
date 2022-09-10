import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SearchBarService {
  private showSearchBarOnHeader = new BehaviorSubject<boolean>(false);
  public showSearchBarOnHeader$ = this.showSearchBarOnHeader.asObservable();
  public query = new BehaviorSubject<string>('');
  public query$ = this.query.asObservable();

  constructor() { }
  
  getQuery()
  {
    return this.query$;
  }

  setQuery(value: string)
  {
    this.query.next(value);
  }
  // hideHeaderSearchBar()
  // {
  //   this.showSearchBarOnHeader.next(false);
  // }
  //   showHeaderSearchBar()
  // {
  //   this.showSearchBarOnHeader.next(true);
  // }
}

