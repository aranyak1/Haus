import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarService } from '../core/services/search-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities = ['banglore', 'hyderabad', 'visakhapatnam', 'bhubaneswar'];
  constructor(private searchbarservice:SearchBarService,private router: Router) {}

  ngOnInit(): void {}

  navigateToSearch(city:string) {
    // this.searchbarservice.setQuery(city);
    this.router.navigate(['/search'],{queryParams:{searchQuery :city,page:1}});
  }
}
