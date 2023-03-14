import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SongService } from 'src/app/services/song.service';
import { errorHandler } from 'src/app/shared/errorHandler';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form!: FormGroup;
  errors: string | undefined = undefined;

  constructor(private fb: FormBuilder, private songService: SongService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      year: ['', [Validators.required]],
      songImage: ['', [Validators.required]]
    })
  }

  async addSong() {
    this.songService.addSong(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        console.log(err);
        this.errors = errorHandler(err.error?.error);
      }
    })
  }
}
