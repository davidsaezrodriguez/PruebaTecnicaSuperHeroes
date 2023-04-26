// Angular
import { Injectable } from '@angular/core';
// Akita
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
// Models
import { Hero } from '../models/hero.model';

export interface HeroState extends EntityState<Hero, number>, ActiveState {}

export function createInitialHeroState(): HeroState {
  return {
    loading: false,
    active: null,
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'hero',
  idKey: 'id',
  resettable: true,
})
export class HeroStore extends EntityStore<HeroState> {
  constructor() {
    super(createInitialHeroState());
  }
}
