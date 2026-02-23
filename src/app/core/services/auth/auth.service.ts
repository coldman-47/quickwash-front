import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  user = new BehaviorSubject(null);
  token = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(payload: { firstName: string; lastName: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/user`, payload);
  }
}
