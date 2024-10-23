import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: []
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>, // Referencia al diálogo para controlarlo
    @Inject(MAT_DIALOG_DATA) public data: Hero, // Inyecta datos del héroe en el diálogo
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Cierra el diálogo sin confirmar
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Cierra el diálogo con confirmación
  }
}
