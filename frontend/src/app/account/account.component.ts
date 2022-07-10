import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  buttons = [
    {
      name: 'MY PROFILE',
      route: 'profile',
      svg: 'profile-white.svg',
    },
    {
      name: 'MY BOOKINGS',
      route: 'bookings',
      svg: 'suitcase-white.svg',
    },
    {
      name: 'MY LISTINGS',
      route: 'listings',
      svg: 'house-white.svg',
    }
  ];
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  navigate(url: string | undefined) {
    // console.log(this.router.url, url);
    let baseUrl: string = this.router.url;
    let len = baseUrl.length;
    let baseUrlArr = baseUrl.split('/');
    baseUrlArr.pop();
    baseUrl = baseUrlArr.join('/');
    this.router.navigate([`${baseUrl}/${url}`]);
  }
}
