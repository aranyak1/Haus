import { Component, OnInit } from '@angular/core';
import { SearchBarService } from 'src/app/core/services/search-bar.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showSearchBarHeader = false;
  userName = 'Abc';
  userLoggedIn = false;
  constructor(
    private searchBarService: SearchBarService,
    private router: Router,
    private userService: UserService
  ) {
    searchBarService.showSearchBarOnHeader$.subscribe((data) => {
      this.showSearchBarHeader = data;
    });
    this.userService.userLoggedIn.subscribe((value: any) => {
      this.userLoggedIn = value;
      this.userName = this.userService.userName;
    });
  }

  ngOnInit(): void {}

  navigate() {
    this.router.navigate([`/account/users/${this.userService.userId}/profile`]);
  }

  logout() {
    this.userService.logoutUser().subscribe((res: any) => {
      this.userService.userId = null;
      this.userService.userLoggedIn.next(false);
    });
  }
}
