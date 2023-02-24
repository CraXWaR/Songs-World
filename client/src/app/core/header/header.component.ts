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

  get isLogged(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private userService: UserService, private router: Router) {
    // this.getUserUsername();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }
  // getUserUsername() {
  //   let token = localStorage.getItem('token');

  //   this.userService.getUsername({ token }).subscribe({
  //     next: (user) => {
  //       this.user = user
  //     },
  //     error: (err) => {
  //       console.log(err);

  //     }
  //   });
  // }
}


