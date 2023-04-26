// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouteData } from 'src/app/core/models/route-data.model';
// Services
import { RouteService } from 'src/app/core/services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // Para cerrar observables cuando se acabe con el componente
  private destroy$ = new Subject();

  currentRouteData!: RouteData;

  constructor(private routeService: RouteService, private router: Router) {}

  ngOnInit(): void {
    this.setTitle();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public goBackUrl(): void {
    this.router.navigateByUrl(this.currentRouteData.backUrl);
  }

  private setTitle(): void {
    this.routeService
      .getCurrentRouteData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: RouteData) => {
        this.currentRouteData = data;
      });
  }
}
