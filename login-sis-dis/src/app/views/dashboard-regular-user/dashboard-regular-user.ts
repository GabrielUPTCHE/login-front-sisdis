import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';
import { UserService } from '../../services/user-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SnackBarService } from '../../services/snack-bar-service';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../../shared/loading/loading';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard-regular-user',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDialogModule, LoadingComponent],
  templateUrl: './dashboard-regular-user.html',
  styleUrl: './dashboard-regular-user.scss'
})
export class DashboardRegularUser {

  isLoadingCode = false;

  constructor(private router: Router,
    private authUtils: AuthUtilsService,
    private userService: UserService,
    private snackBarService: SnackBarService) { }

  logout(): void {
    this.authUtils.clearSession();
    this.router.navigate(['/']);
  }

  changePassword(): void {
    const existEmail = this.authUtils.decodeToken()?.email;
    if (existEmail) {
      this.isLoadingCode = true;
    }
    this.userService.requestResetPassword(this.authUtils.decodeToken()?.email || '').subscribe(
      {
        next: (response) => {
          this.isLoadingCode = false;
          this.snackBarService.openSnackBar('Se envio un correo para restablecer la contraseña', 'Aceptar')
          this.router.navigate(['/recovery-password']);
        },
        error: (error) => {
          console.error('Error requesting password reset:', error);
          this.snackBarService.openSnackBar('Ocurrio un error', 'Aceptar');
        }
      }
    );
  }

}
