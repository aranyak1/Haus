import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignup = false;
  title = 'Login';
  passwordVisible = false;
  password?: string;
  firebaseAuths = ['google', 'facebook', 'apple', 'twitter'];

  constructor(private router: Router, private userService: UserService) {
    if (router.url === '/signup') {
      this.isSignup = true;
      this.title = 'Signup';
    }
  }

  ngOnInit(): void {}

  onSubmit(authForm: any) {
    if (this.isSignup) {
      this.userService.signupUser(authForm.value).subscribe((res) => {
        console.log('user signedup',res);
      });
    } else {
      this.userService.loginUser(authForm.value).subscribe((res) => {
        console.log('user loggedin',res);
      });
    }
    console.log(authForm.value);
  }
}
