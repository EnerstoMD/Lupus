import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface AuthToken{
  token:string
  status:number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<AuthToken>(environment.patapiUrl+'/user/login', {"email": email, "password": password})
  }
  logout() {
    localStorage.removeItem('token')
  }
}
