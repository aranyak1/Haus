import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  defaultEmail = 'bfrancey3@mapquest.com';
  defaultPassword = 'responsive';
  isSignup = false;
  title = 'Login';
  passwordVisible = false;
  password?: string;
  firebaseAuths = ['google', 'facebook', 'apple', 'twitter'];

  constructor(
    private router: Router,
    private userService: UserService,
    private message: NzMessageService
  ) {
    if (router.url === '/signup') {
      this.defaultEmail = '';
      this.defaultPassword = '';
      this.isSignup = true;
      this.title = 'Signup';
    } else {
      this.defaultEmail = 'bfrancey3@mapquest.com';
      this.defaultPassword = 'responsive';
    }
  }

  ngOnInit(): void {}

  onSubmit(authForm: any) {
    if (this.isSignup) {
      this.userService.signupUser(authForm.value).subscribe((res: any) => {
        this.message.create(
          'success',
          'Signup successful redirecting to home page'
        );
        // console.log('user signedup', res);
        this.userService.userId = res.body.data.user._id;
        this.userService.userName = res.body.data.user.firstName;
        this.userService.userLoggedIn.next(true);
        this.router.navigate(['/']);
      });
    } else {
      this.userService.loginUser(authForm.value).subscribe((res: any) => {
        this.message.create(
          'success',
          'Login successful redirecting to home page'
        );
        this.userService.userId = res.body.data.user._id;
        this.userService.userName = res.body.data.user.firstName;
        this.userService.userLoggedIn.next(true);
        this.router.navigate(['/']);
        // console.log('user loggedin', res);
      });
    }
    // console.log(authForm.value);
  }
}
