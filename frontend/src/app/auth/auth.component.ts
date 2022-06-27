import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isSignup = false;
  title = 'Login';
  passwordVisible = false;
  password?: string;
  firebaseAuths = ['google', 'facebook', 'apple', 'twitter'];

  constructor(private router: Router) { 
    if (router.url === '/signup')
    {
      this.isSignup = true;
      this.title = 'Signup';
      }
  }

  ngOnInit(): void {
  }

  onSubmit(authForm: any)
  {
    console.log(authForm.value);
  }
}
