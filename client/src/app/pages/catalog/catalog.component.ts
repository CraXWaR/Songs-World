import { Component } from '@angular/core';
import { SongService } from 'src/app/services/song.service';
import { ISong } from 'src/app/shared/interfaces/songInterface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  songs: ISong[] | undefined;
  songsLength: any;
  isEmpty: boolean = false;
  ifUser: boolean = true;
  token: string | null = localStorage.getItem('token');

  constructor(private songService: SongService) {
    this.getAllSongs();
  }

  getAllSongs() {
    if (!this.token) {
      this.ifUser = false;
    }

    this.songs = undefined;
    this.songService.getAllSongs().subscribe({
      next: (songs) => {
        this.songs = songs;
        this.songsLength = songs.length || 0
        if (songs.length == 0) {
          this.isEmpty = true;
        }
      }
    })
  }
}

