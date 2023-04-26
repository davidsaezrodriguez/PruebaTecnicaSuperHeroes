// Angular
import { Injectable } from '@angular/core';
// Akita
import { QueryEntity } from '@datorama/akita';
import { HeroState, HeroStore } from './hero.store';
// Model
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroQuery extends QueryEntity<HeroState> {
  public heros$ = this.selectAll();
  public heroActive$ = this.selectActive();
  public loading$ = this.selectLoading();

  constructor(protected override store: HeroStore) {
    super(store);
  }

  getHeroById(id: number): Hero {
    return this.getEntity(id) as Hero;
  }

  existHero(id: number): boolean {
    return this.getEntity(id) != null;
  }

  getHeroContainStringInName(name: string): Hero[] {
    return this.getAll().filter((hero) => hero.name.toUpperCase().includes(name.toUpperCase()));
  }

  getHeros(): Hero[] {
    return this.getAll();
  }
}
