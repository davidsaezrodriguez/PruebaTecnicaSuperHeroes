//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Enums
import { NavigationLink } from './core/enums/navigation-links';

const routes: Routes = [
  {
    path: NavigationLink.Home,
    loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
