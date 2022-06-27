import { Component, OnInit } from '@angular/core';
import { SearchBarService } from 'src/app/core/services/search-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {
  showSearchBarHeader = false;
  constructor(private searchBarService: SearchBarService) {
    searchBarService.showSearchBarOnHeader$.subscribe((data) => {
      this.showSearchBarHeader = data;
    })
   }

  ngOnInit(): void {
  }

}
