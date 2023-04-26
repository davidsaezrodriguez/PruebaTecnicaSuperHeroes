//Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { HeroRoutingModule } from './hero-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// Components
import { TableHeroComponent } from './components/table-hero/table-hero.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';

@NgModule({
  declarations: [TableHeroComponent, FormHeroComponent],
  imports: [CommonModule, HeroRoutingModule, SharedModule],
})
export class HeroModule {}
