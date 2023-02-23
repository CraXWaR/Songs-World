import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/userInterface';
import { tap } from 'rxjs';

import { environment } from 'src/environments/environment';
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: null | IUser | undefined;
  userInfo: null | Object = null;
  constructor(private http: HttpClient) { }

  get isLogged(): boolean {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }
  register(data: {}) {
    return this.http.post<IUser>(`${API_URL}/register`, data).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', this.user.accessToken);
      })
    )
  }
  login(data: {}) {
    return this.http.post<IUser>(`${API_URL}/login`, data).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', this.user.accessToken);
      })
    )
  }
  logout() {
    this.user = null;
    return this.http.delete(`${API_URL}/logout`).subscribe();
  }
}
