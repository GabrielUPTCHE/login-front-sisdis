import { Component, inject } from '@angular/core';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ChangeRoleDialog } from '../../components/change-role-dialog';
import { SnackBarService } from '../../services/snack-bar-service';

export interface User {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss'
})
export class DashboardAdmin {

  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);

  constructor(
    private router: Router,
    private authUtils: AuthUtilsService,
    private userService: UserService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.dataSource.data = users.data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  logout(): void {
    this.authUtils.clearSession();
    this.router.navigate(['/']);
  }

  editRole(user: any) {
    const dialogRef = this.dialog.open(ChangeRoleDialog, {
      width: '400px',
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.changeUserRole(result.username, result.role).subscribe({
          next: (response) => {
            this.userService.getUsers().subscribe({
              next: (users: any) => {
                this.dataSource.data = users.data;
                this.snackBarService.openSnackBar('Se actualizo el rol correctamente', 'Aceptar')
              },
              error: (error) => {
                console.error('Error fetching users:', error);
                this.snackBarService.openSnackBar('Ocurrio un error', 'Aceptar');
              }
            });
          },
          error: (error) => {
            console.error('Error updating role:', error);
          }
        });
      }
    });
  }

  changePassword(): void {
    alert('Funcionalidad de cambio de contraseña');
  }
}
