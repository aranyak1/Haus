import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(path: string, options?: any) {
    return this.http
      .get(`${environment.apiUrl}${environment.apiVersion}${path}`, options)
      .pipe(catchError((err) => {
        console.log(err);
        return throwError(() => new Error(err.error));
      }));
  }
  public post(path: string, data: any, options?: any) {
    return this.http.post(path, data, options);
  }
  public patch(path: string, data: any, options?: any) {
    return this.http.patch(path, data, options);
  }
  public delete(path: string, options?: any) {
    return this.http.delete(path, options);
  }
}
function err(err: any): import("rxjs").OperatorFunction<ArrayBuffer, unknown> {
  throw new Error('Function not implemented.');
}

