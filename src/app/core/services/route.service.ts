// Angular
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// Models
import { RouteData } from '../models/route-data.model';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private currentRouteData: BehaviorSubject<RouteData> = new BehaviorSubject({
    title: '',
    backUrl: '',
  });

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        map((route) => route.snapshot.data)
      )
      .subscribe((data) => {
        const routeData: RouteData = {
          title: data['title'],
          backUrl: data['backUrl'],
        };
        this.currentRouteData.next(routeData);
      });
  }

  public getCurrentRouteData(): Observable<RouteData> {
    return this.currentRouteData;
  }
}
