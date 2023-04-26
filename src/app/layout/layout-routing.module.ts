//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Enums
import { NavigationLink } from '../core/enums/navigation-links';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: NavigationLink.Home,
    component: LayoutComponent,
    children: [
      {
        path: NavigationLink.Home,
        loadChildren: () => import('../features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: NavigationLink.Hero,
        loadChildren: () => import('../features/hero/hero.module').then((m) => m.HeroModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
