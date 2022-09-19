import { Injectable } from '@angular/core';
import { UserService } from './core/services/user.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService:UserService,private router:Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({ withCredentials: true });
    console.log(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if jwt has expired logout the user
        if (error.error.message == 'jwt expired' || error.error.message == 'jwt malformed') {
          error.error.message = 'User invalid redirecting to home page';
              this.userService.logoutUser().subscribe((res: any) => {
                this.userService.userId = null;
                this.userService.userLoggedIn.next(false);
              });
              this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
