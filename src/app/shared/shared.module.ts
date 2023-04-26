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
import { UpperCaseDirective } from './directives/UpperCaseDirective';

const angularMaterial = [
  MatIconModule,
  MatPaginatorModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
];

const directives = [UpperCaseDirective];
@NgModule({
  declarations: [...directives],
  imports: [CommonModule, ReactiveFormsModule, ...angularMaterial],
  exports: [ReactiveFormsModule, ...angularMaterial, ...directives],
})
export class SharedModule {}
