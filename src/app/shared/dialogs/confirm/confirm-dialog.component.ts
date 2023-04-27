//Angular
import { Component, Inject } from '@angular/core';
// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Models
import { ConfirmDialogData } from './models/data-confirm-dialog.model';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

  public confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
