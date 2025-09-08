import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';
import { decodeLoginResponse, LoginResponse } from '../models/login-models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private _token = signal<string | null>(null);
  private apiUrl = enviroment.apiUrl
  private decodeUser = signal<decodeLoginResponse | null>(null);

  get token() {
    return this._token();
  }

  login(email: string, password: string): Observable<decodeLoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        const decodeUser = jwtDecode<decodeLoginResponse>(response.data.accessToken);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        this.decodeUser.set(decodeUser);
        this._token.set(response.data.accessToken);
      }),
       map(() => {
        return this.decodeUser();
      })
    );
  }

  logout() {
    this._token.set(null);
  }
}
