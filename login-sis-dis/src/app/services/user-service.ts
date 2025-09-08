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

}
