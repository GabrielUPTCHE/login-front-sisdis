import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-role-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSelectModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogModule],
  templateUrl: './change-role-dialog.html',
  styleUrls: ['./change-role-dialog.scss']
})
export class ChangeRoleDialog {
  roles = ['admin', 'user'];
  selectedRole: string;

  constructor(
    public dialogRef: MatDialogRef<ChangeRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedRole = data.role;
  }

  save() {
    this.dialogRef.close({ ...this.data, role: this.selectedRole });
  }

  close() {
    this.dialogRef.close();
  }
}
