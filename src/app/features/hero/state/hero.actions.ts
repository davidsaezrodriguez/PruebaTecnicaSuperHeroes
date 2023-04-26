//Angular
import { Injectable } from '@angular/core';
import { HeroStore } from './hero.store';
import { HeroService } from '../services/hero.service';
import { Hero } from '../models/hero.model';
import { HeroQuery } from './hero.query';

@Injectable({
  providedIn: 'root',
})
export class HeroActions {
  constructor(
    private heroStore: HeroStore,
    private heroQuery: HeroQuery,
    private heroService: HeroService
  ) {}

  fetchHeroById(id: number): void {
    if (!this.heroQuery.existHero(id)) {
      this.getHeroById(id);
    }
  }

  getHeros(): void {
    this.heroStore.setLoading(true);
    this.heroStore.setError(null);
    this.heroService.getHeros().subscribe(
      (data: Hero[]) => {
        this.heroStore.set(data);
        this.heroStore.setLoading(false);
      },
      () => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(null);
      }
    );
  }

  addHero(hero: Hero): void {
    this.heroStore.setLoading(true);
    this.heroStore.setError(null);
    this.heroService.postHero(hero).subscribe(
      (data: Hero) => {
        this.heroStore.add(data);
        this.heroStore.setLoading(false);
      },
      () => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(null);
      }
    );
  }

  updateHero(hero: Hero): void {
    this.heroStore.setLoading(true);
    this.heroStore.setError(null);
    this.heroService.updateHero(hero).subscribe(
      (data: Hero) => {
        this.heroStore.update(data.id, data);
        this.heroStore.setLoading(false);
      },
      () => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(null);
      }
    );
  }

  deleteHero(id: number): void {
    this.heroStore.setLoading(true);
    this.heroStore.setError(null);
    this.heroService.deleteHero(id).subscribe(() => {
      this.heroStore.remove(id);
      this.heroStore.setLoading(false);
    });
  }

  setActive(id: number): void {
    this.heroStore.setActive(id);
  }

  private getHeroById(id: number): void {
    this.heroStore.setLoading(true);
    this.heroStore.setError(null);
    this.heroService.getHeroById(id).subscribe(
      (data: Hero) => {
        this.heroStore.add(data);
        this.heroStore.setActive(data.id);
        this.heroStore.setLoading(false);
      },
      () => {
        this.heroStore.setLoading(false);
        this.heroStore.setError(null);
      }
    );
  }
}
