import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error',
  template: `
    <div class="el-center my-10">
      <h1
        class="error-heading"
      >
        404 : Page Not Found
      </h1>
      <p >Oops! Looks like you got lost</p>
      <p >Redirecting to Home Page</p>
    </div>
  `,
  styles: [
    `p{
      font-size: 2rem;
    }
    
    .error-heading{
      padding-bottom:1rem;
      color:transparent;
      background-clip: text;
      background-image: linear-gradient(to right,#f37335,#fdc830);
    }
      `

  ],
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 3000);
  }
}
