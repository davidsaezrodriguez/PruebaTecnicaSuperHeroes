//Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Enums
import { NavigationLink, PathParams, TitlesPage } from 'src/app/core/enums/navigation-links';
// Components
import { TableHeroComponent } from './components/table-hero/table-hero.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';
// Models
import { RouteData } from 'src/app/core/models/route-data.model';

const routes: Routes = [
  {
    path: NavigationLink.List,
    component: TableHeroComponent,
    data: {
      title: TitlesPage.HerosList,
      backUrl: `/`,
    } as RouteData,
  },
  {
    path: NavigationLink.NewForm,
    component: FormHeroComponent,
    data: {
      title: TitlesPage.HeroInsert,
      backUrl: `${NavigationLink.Hero}/${NavigationLink.List}`,
    } as RouteData,
  },
  {
    path: NavigationLink.EditForm,
    component: FormHeroComponent,
    data: {
      title: TitlesPage.HeroUpdate,
      backUrl: `${NavigationLink.Hero}/${NavigationLink.List}`,
    } as RouteData,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroRoutingModule {}
