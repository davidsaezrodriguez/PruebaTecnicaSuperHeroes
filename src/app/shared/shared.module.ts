// Angular
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
// Directivas custom
import { UpperCaseDirective } from './directives/UpperCaseDirective';
// Components
import { ConfirmDialogComponent } from './dialogs/confirm/confirm-dialog.component';

const angularMaterial = [
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
];

const directives = [UpperCaseDirective];

const components = [ConfirmDialogComponent];

@NgModule({
  declarations: [...components, ...directives],
  imports: [CommonModule, ReactiveFormsModule, ...angularMaterial],
  exports: [ReactiveFormsModule, ...components, ...angularMaterial, ...directives],
})
export class SharedModule {}
