import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { ISong } from 'src/app/shared/interfaces/songInterface';
import { IUser } from 'src/app/shared/interfaces/userInterface';
import { emailValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: IUser | undefined;
  onEdit: boolean = false;
  form!: FormGroup;
  errors: string | undefined = undefined;
  songs:ISong[] | any =null;
  isEmpty: boolean = false;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router, private songService: SongService) {

    this.getUserInfo();
    this.getOwnedSongs();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, emailValidator]],
      personalInfo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(7000)]],
      avatar: ['', [Validators.required]]
    });

  }

  getUserInfo() {
    let token = localStorage.getItem('token');

    this.userService.getUserData({ token }).subscribe({
      next: (user) => {
        this.user = user
        console.log(this.user);
        
      },
      error: (err) => {
        console.log(err);

      }
    });
  }
  onEditUser() {
    const id = this.user?._id;
    let token = localStorage.getItem('token');
    let value = this.form.value;
    value.token = token;
    console.log(value);

    this.userService.editUser(id, value).subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.errors = errorHandler(err.error?.error);
      }
    });
  }
  getOwnedSongs() {
    this.songService.getOwnedSongs().subscribe({
      next: (v) => {
        this.songs = v;
        console.log(this.songs);
        
        if (v.length == 0) {
          this.isEmpty = true;
        }
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }
}