import { Component } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { ISong } from 'src/app/shared/interfaces/songInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  songs: ISong[] | undefined;
  isEmpty: boolean = true;

  constructor(private songService: SongService) {
    this.getMostExpensiveSongs();
  }

  getMostExpensiveSongs() {
    this.songService.getMostExpnesiveSongs().subscribe({
      next: (value) => {
        if (value.length > 0) {
          this.isEmpty = false;
          this.songs = value
        }
      },
      error: (err) => console.log(err)
    })
  }
}
