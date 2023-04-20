import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/userInterface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: IUser | undefined;
  token: string | null = localStorage.getItem('token');

  get isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private userService: UserService, private router: Router) {
    if (this.token) {
      this.getUserUsername();
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
  getUserUsername() {
    let token = localStorage.getItem('token');

    this.userService.getUserData({ token }).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}


