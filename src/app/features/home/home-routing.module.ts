// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Enums
import { NavigationLink, TitlesPage } from 'src/app/core/enums/navigation-links';
// Components
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: NavigationLink.Home, component: HomeComponent, data: { title: TitlesPage.Home } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
