import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlFeaturesService {
  private page = new BehaviorSubject<number>(0);
  private sort = new BehaviorSubject<any>(undefined);
  private searchQuery = new BehaviorSubject<string>('');
  constructor() { }
  
  changePage(pageNo:number)
  {
    this.page.next(pageNo);
  }
}
