import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth:AuthService) {}

  isTokenExpired(token:any): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token')
    if (token) {
      if (this.isTokenExpired(token)) {
        console.log('token expired')
        this.auth.logout();
        localStorage.removeItem('token');
        } else {
        console.log('interception')
        request = this.addToken(request, token);
        }
      }
      return next.handle(request);
    }
}
