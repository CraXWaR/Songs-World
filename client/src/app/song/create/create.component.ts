import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { errorHandler } from 'src/app/shared/errorHandler';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  errors: string | undefined = undefined;

  constructor(private songService: SongService, private router: Router) { }

  async addSong(form: NgForm) {
    let token = localStorage.getItem('token');
    let value = form.value;
    value.token = token;

    this.songService.addSong(value).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => {
        this.errors = errorHandler(err?.error?.error);
      }
    })
    console.log(value);

  }
}
