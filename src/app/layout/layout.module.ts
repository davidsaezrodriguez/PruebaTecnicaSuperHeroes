//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { LayoutRoutingModule } from './layout-routing.module';
// Components
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
})
export class LayoutModule {}
