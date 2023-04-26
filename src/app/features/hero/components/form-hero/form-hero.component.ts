// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
// Akita
import { HeroActions } from '../../state/hero.actions';
import { HeroQuery } from '../../state/hero.query';
// Models
import { Hero } from '../../models/hero.model';
// Enums
import { NavigationLink, PathParams } from 'src/app/core/enums/navigation-links';

@Component({
  selector: 'form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.scss'],
})
export class FormHeroComponent implements OnInit, OnDestroy {
  // Para cerrar observables cuando se acabe con el componente
  private destroy$ = new Subject();

  heroForm!: FormGroup;
  editMode = false;
  heroEdit!: Hero;

  constructor(
    private heroActions: HeroActions,
    private heroQuery: HeroQuery,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public createHero(): void {
    const hero: Hero = {
      id: Math.floor(Math.random() * (999999 - 40 + 1)) + 40,
      name: this.heroForm.controls['name'].getRawValue(),
      ability: this.heroForm.controls['ability'].getRawValue(),
    };
    this.heroActions.addHero(hero);
    this.router.navigate([NavigationLink.Hero, NavigationLink.List]);
  }

  public updateHero(): void {
    const hero: Hero = {
      id: this.heroEdit.id,
      name: this.heroForm.controls['name'].getRawValue(),
      ability: this.heroForm.controls['ability'].getRawValue(),
    };
    this.heroActions.updateHero(hero);
    this.router.navigate([NavigationLink.Hero, NavigationLink.List]);
  }

  private checkMode(): void {
    const id = this.activatedRoute.snapshot.queryParams[PathParams.HeroId];
    if (id) {
      this.editMode = true;
      this.heroActions.fetchHeroById(id);
      this.heroQuery.heroActive$
        .pipe(
          takeUntil(this.destroy$),
          filter((heroActive) => !!heroActive)
        )
        .subscribe((heroActive) => {
          this.heroEdit = heroActive as Hero;
          this.heroForm.controls['name'].setValue((heroActive as Hero).name);
          this.heroForm.controls['ability'].setValue((heroActive as Hero).ability);
        });
    }
  }
  private initForm(): void {
    this.heroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ability: new FormControl('', Validators.required),
    });
  }
}
