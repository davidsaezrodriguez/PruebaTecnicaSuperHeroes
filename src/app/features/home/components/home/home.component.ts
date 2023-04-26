// Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Enums
import { NavigationLink } from 'src/app/core/enums/navigation-links';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectHerosList(): void {
    this.router.navigate([NavigationLink.Hero, NavigationLink.List]);
  }
}
