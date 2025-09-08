import { Component } from '@angular/core';
import { AuthUtilsService } from '../../utils/decode/decode-jwt';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user-service';

export interface User {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss'
})
export class DashboardAdmin {
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([
  ]);

  constructor(
    private router: Router,
    private authUtils: AuthUtilsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users: any) => {
        this.dataSource.data = users.data;
        console.log('Users fetched:', users);
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

  editRole(user: User): void {
    alert(`Editar rol de ${user.username}`);
  }

  changePassword(): void {
    alert('Funcionalidad de cambio de contraseña');
  }
}
