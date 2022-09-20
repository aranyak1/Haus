import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private message: NzMessageService) {}

  public get(path: string, options?: any) {
    return this.http
      .get(`${environment.apiUrl}${environment.apiVersion}${path}`, options)
      .pipe(
        catchError((err) => {
          // console.log(err);
          this.message.create('error', err.error.message);
          return throwError(() => new Error(err.error));
        })
      );
  }
  public post(path: string, data: any, options?: any) {
    return this.http
      .post(
        `${environment.apiUrl}${environment.apiVersion}${path}`,
        data,
        options
      )
      .pipe(
        catchError((err) => {
          this.message.create('error', err.error.message);
          // console.log(err);
          return throwError(() => new Error(err.error));
        })
      );
  }
  public patch(path: string, data: any, options?: any) {
    return this.http
      .patch(
        `${environment.apiUrl}${environment.apiVersion}${path}`,
        data,
        options
      )
      .pipe(
        catchError((err) => {
          // console.log(err);
          this.message.create('error', err.error.message);
          return throwError(() => new Error(err.error));
        })
      );
  }
  public delete(path: string, options?: any) {
    return this.http.delete(path, options);
  }
}
function err(err: any): import('rxjs').OperatorFunction<ArrayBuffer, unknown> {
  throw new Error('Function not implemented.');
}
