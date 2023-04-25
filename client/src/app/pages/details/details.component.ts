import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { ISong } from 'src/app/shared/interfaces/songInterface';

import jwt_decode from 'jwt-decode';
import { IUser } from 'src/app/shared/interfaces/userInterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  song: ISong | undefined;
  isOwner: boolean = false;
  user: IUser | undefined;
  errors: Object | undefined;
  editMode: boolean = false;
  token: string | null = localStorage.getItem('token');

  constructor(private songService: SongService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.getSong();
    this.getUserInfo();
  }

  decodeToken(token: any) {
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    }
    return;
  }

  getSong() {
    this.song = undefined;
    const decoded = this.decodeToken(this.token) as { _id: string };
    let userId = decoded._id

    const id = this.activatedRoute.snapshot.params['id'];
    this.songService.getOneSong(id).subscribe({
      next: (song) => {
        this.song = song;

        if (userId == song?.owner._id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      },
      error: (error) => {
        this.errors = errorHandler(error.error?.error);
        console.log(error);
      }
    })
  }

  delete() {
    if (this.userService.user?._id != this.song?.owner._id || !this.token) {
      this.router.navigate(['**']);

    }
    const id = this.song?._id;
    this.songService.deleteSong(id).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        this.errors = errorHandler(err);
      }
    })
  }

  onEdit(form: NgForm) {
    const id = this.song?._id;
    let token = localStorage.getItem('token');
    let value = form.value;
    value.token = token;

    this.songService.updateSong(id, value).subscribe({
      next: (song) => {
        this.song = song;
        this.editMode = false;
      },
      error: (err) => {
        this.errors = errorHandler(err.error?.error);
      }
    });
  }

  getUserInfo() {
    let token = localStorage.getItem('token');

    this.userService.getUserData({ token }).subscribe({
      next: (user) => {
        this.user = user;
        console.log(this.user);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
