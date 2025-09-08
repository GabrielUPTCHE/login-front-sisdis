import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  username: string;
  role: string;
  iat: number;
  exp: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthUtilsService {

  private storageKey = 'accessToken';


  constructor(private router: Router) { }
  private getToken(): string | null {
    return sessionStorage.getItem(this.storageKey);
  }

  decodeToken(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (err) {
      console.error('Error decodificando el token', err);
      return null;
    }
  }


  clearSession(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  returnToDashboard(): void {
    const decoded = this.decodeToken();
    if (decoded?.role === 'admin') {
      this.router.navigate(['dashboard-admin']);
    } else {
      this.router.navigate(['dashboard-user']);
    }
  }

}
