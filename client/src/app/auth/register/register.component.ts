import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { errorHandler } from 'src/app/shared/errorHandler';
import { emailValidator, passwordValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  form!: FormGroup;
  errors: string | undefined = undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required, passwordValidator]]
    });
  }
  register() {
    // console.log(this.form.value);
    
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        // console.log(err);
        this.errors = errorHandler(err.error?.error);
      }
    })
  }
}
