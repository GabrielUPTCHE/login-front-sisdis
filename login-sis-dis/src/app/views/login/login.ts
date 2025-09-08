import { Component, effect, signal } from '@angular/core';
import { EmailInput } from '../../shared/inputs/email-input/email-input';
import { PasswordInput } from '../../shared/inputs/password-input/password-input';
import { AuthService } from '../../services/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarService } from '../../services/snack-bar-service';

@Component({
  selector: 'app-login',
  imports: [EmailInput, PasswordInput, ReactiveFormsModule, FormsModule, MatButtonModule, MatDividerModule, MatIconModule, RouterModule ],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})


export class Login {
  email = signal('');
  password = signal('');

  constructor(private authService: AuthService, private router: Router, private snackBar: SnackBarService) {
  }

  login(){
    this.authService.login(this.email(), this.password()).subscribe({
      next: (response) => {
        if (response?.role === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        }
        if (response?.role === 'user') {
          this.router.navigate(['/dashboard-user']);
        }
      },
      error: (error) => {
        this.snackBar.openSnackBar(error.error.message, 'Aceptar');
      }
    });
  }
}

