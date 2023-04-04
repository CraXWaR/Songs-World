import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/userInterface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: IUser | undefined;

  constructor(private userService: UserService) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.user = undefined;
    this.userService.getUserData().subscribe({
      next: (user) => {
        this.user = user;
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}


//TODO GET USER INFO