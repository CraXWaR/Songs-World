import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { UserService } from 'src/app/services/user.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { ISong } from 'src/app/shared/interfaces/songInterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  song: ISong | undefined;
  isOwner: boolean = false;
  errors: Object | undefined;
  editMode: boolean = false;

  constructor(private songService: SongService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.getSong();
  }

  getSong() {
    this.song = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.songService.getOneSong(id).subscribe({
      next: (song) => {
        this.song = song;
        //TODO fix userId
        console.log(this.userService.user?._id);
        
        if (this.userService.user?._id === song.owner._id) {
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
    //TODO validation
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
    //TODO check if owner

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
}
