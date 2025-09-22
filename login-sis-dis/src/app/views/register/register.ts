import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';
import { SnackBarService } from '../../services/snack-bar-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: SnackBarService) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.snackBar.openSnackBar('Registro exitoso', 'Aceptar');
        },
        error: (error) => {
          this.snackBar.openSnackBar(error.error.message, 'Aceptar');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
