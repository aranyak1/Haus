import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private houseData = new BehaviorSubject<any>(null);
  public houseData$ = this.houseData.asObservable();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    route.queryParams.subscribe((params) => {
      // call api only when queryparams of /search changes
      if (router.url.startsWith('/search')) {
        this.apiService.get('homes', { params }).subscribe((data) => {
          console.log('called /search api');
          this.houseData.next(data);
        });
      }
    });

    // this.router.events.subscribe((ev: any) => {
    //   if (ev instanceof NavigationEnd) {
    //     console.log(route, ev, ev.url);
    //   }
    // });
  }

  // getAllHouses() {
  //   return this.apiService.get('homes');
  // }

  getHouseById(id:string) {
    return this.apiService.get(`homes/${id}`);
  }
}
