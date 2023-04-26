// Angular
import { Injectable } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// Models
import { Hero, IHero } from '../models/hero.model';

// Si no esta arrancada la API habra que ejecutar "npm run apimock" para ejecutar la api que hara el mock
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private http: HttpClient) {}

  getHeros(): Observable<Hero[]> {
    return this.http.get<IHero[]>('http://localhost:3000/heros').pipe(
      delay(2000), // Añadimos delay para simular un backend sin mock
      map((iHeros: IHero[]) => {
        return iHeros.map((iHero) => Hero.adaptFromApi(iHero));
      })
    );
  }

  getHeroById(idHero: number): Observable<Hero> {
    return this.http.get<IHero>(`http://localhost:3000/heros/${idHero}`).pipe(
      map((iHero: IHero) => {
        return Hero.adaptFromApi(iHero);
      })
    );
  }

  postHero(hero: Hero): Observable<Hero> {
    return this.http.post<IHero>(`http://localhost:3000/heros`, Hero.adaptToApi(hero)).pipe(
      delay(2000), // Añadimos delay para simular un backend sin mock
      map((iHero: IHero) => {
        return Hero.adaptFromApi(iHero);
      })
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http
      .patch<IHero>(`http://localhost:3000/heros/${hero.id}`, Hero.adaptToApi(hero))
      .pipe(
        delay(2000), // Añadimos delay para simular un backend sin mock
        map((iHero: IHero) => {
          return Hero.adaptFromApi(iHero);
        })
      );
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<IHero>(`http://localhost:3000/heros/${id}`).pipe(
      delay(2000), // Añadimos delay para simular un backend sin mock
      map((iHero: IHero) => {
        return Hero.adaptFromApi(iHero);
      })
    );
  }
}
