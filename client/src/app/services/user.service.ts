import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces/userInterface';

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
}
