import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar-service';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.scss']
})
export class ChangePassword {
  changePasswordForm: FormGroup;
  email = '';
  code = '';

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private queryParams :ActivatedRoute,
              private router: Router,
              private snackBar: SnackBarService,
              private jwtService: AuthUtilsService) {
    this.queryParams.queryParams.subscribe(params => {
       this.email = params['email'] || '';
       this.code = params['code'] || '';
    });
    this.changePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? true : false;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.userService.changePassword( this.email, this.code, this.changePasswordForm.get('newPassword')?.value || '').subscribe({
        next: (response) => {
          this.snackBar.openSnackBar('Contraseña cambiada con éxito.', 'Aceptar');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.openSnackBar('Error al cambiar la contraseña.', 'Aceptar');
          console.error('Error cambiando la contraseña:', error);
        }
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.jwtService.returnToDashboard();
  }
}
