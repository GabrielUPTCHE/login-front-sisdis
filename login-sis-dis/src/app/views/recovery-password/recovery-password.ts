import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/snack-bar-service';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './recovery-password.html',
  styleUrls: ['./recovery-password.scss']
})
export class RecoveryPassword {
  codeControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor( private userService: UserService,
               private decodeJwt: AuthUtilsService,
               private router: Router,
               private snackBar: SnackBarService,
               private jwtService: AuthUtilsService) { }

  submitCode() {
    const decodeUser = this.decodeJwt.decodeToken();

    if (this.codeControl.valid) {
      this.userService.verifyResetCode(decodeUser?.email || '', this.codeControl.value || '').subscribe({
        next: (response) => {
          this.snackBar.openSnackBar('Código verificado.', 'Aceptar');
          this.router.navigate(['/change-password'], { queryParams: { email: decodeUser?.email, code:this.codeControl.value || ''  } });
        },
        error: (error) => {
          this.snackBar.openSnackBar('Ocurrio un error al veridicar el codigo.', 'Aceptar');
          console.error('Error verificando el código:', error);
        }
      });

    } else {
      console.log('Código inválido');
    }
  }

  cancel() {
    this.jwtService.returnToDashboard();
  }
}
