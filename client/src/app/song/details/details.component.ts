import { Component } from '@angular/core';
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

  constructor(private songService: SongService, private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) {
    this.getSong();
  }

  getSong() {
    this.song = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.songService.getOneSong(id).subscribe({
      next: (song) => {
        this.song = song;
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
}
