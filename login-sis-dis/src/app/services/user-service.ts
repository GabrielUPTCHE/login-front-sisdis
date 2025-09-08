import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroment/enviroment';

@Injectable({providedIn: 'root'})
export class UserService {
  apiUrl = enviroment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(`${this.apiUrl}/users`);
  }

  registerUser(userData: any) {
    return this.httpClient.post(`${this.apiUrl}/register`, userData);
  }

  changeUserRole(identifier: number, newRole: string) {
    return this.httpClient.patch(`${this.apiUrl}/users/role`, { identifier, newRole});
  }

  requestResetPassword(email: string) {
    return this.httpClient.post(`${this.apiUrl}/reset-password/request`, { email });
  }

  verifyResetCode(email: string, code: string) {
    return this.httpClient.post(`${this.apiUrl}/reset-password/verify`, { email, code });
  }

  changePassword(email: string, code: string, newPassword: string) {
    return this.httpClient.post(`${this.apiUrl}/reset-password/change`, { email, code , newPassword});
  }
}
