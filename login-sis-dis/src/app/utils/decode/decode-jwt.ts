import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  username: string;
  role: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthUtilsService {

  private storageKey = '';

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

  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  validateSession(): boolean {
    if (!this.getToken() || this.isTokenExpired()) {
      this.clearSession();
      return false;
    }
    return true;
  }

  clearSession(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
