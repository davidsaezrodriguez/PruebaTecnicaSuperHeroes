// Angular
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, combineLatest, filter, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

// Angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
// Models
import { Hero } from '../../models/hero.model';
// Akita
import { HeroActions } from '../../state/hero.actions';
import { HeroQuery } from '../../state/hero.query';
// Enums
import { NavigationLink } from 'src/app/core/enums/navigation-links';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/shared/dialogs/confirm/models/data-confirm-dialog.model';

@Component({
  selector: 'table-hero',
  templateUrl: './table-hero.component.html',
  styleUrls: ['./table-hero.component.scss'],
})
export class TableHeroComponent implements OnInit, OnDestroy {
  // Para cerrar observables cuando se acabe con el componente
  private destroy$ = new Subject();

  displayedColumns: string[] = ['id', 'name', 'ability', 'actions'];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  loadingHeros$ = this.heroQuery.loading$;

  formFilterHero!: FormGroup;

  constructor(
    private heroActions: HeroActions,
    private heroQuery: HeroQuery,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadHeros();
    this.setDataSource();
    this.setForm();
    this.subscribeFilterFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public newHero(): void {
    this.router.navigate([NavigationLink.Hero, NavigationLink.NewForm]);
  }

  public editHero(id: number): void {
    this.heroActions.setActive(id);
    this.router.navigate([NavigationLink.Hero, NavigationLink.EditForm], {
      queryParams: { heroId: id },
    });
  }

  public deleteHero(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar heroe',
        description: 'Con esta accion vas a eliminar el heroe, ¿Estas seguro?',
        buttonText: 'Eliminar',
      } as ConfirmDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroActions.deleteHero(id);
      }
    });
  }

  private loadHeros(): void {
    this.heroActions.getHeros();
  }

  private setDataSource(): void {
    this.heroQuery.heros$
      .pipe(
        takeUntil(this.destroy$),
        filter((heros) => !!heros && heros.length > 0)
      )
      .subscribe((heros) => {
        this.dataSource.data = heros;
        // Hacemos el timeout ya que el viewchild no cargaria bien ya que no esta renderizado en el html el paginator
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      });
  }

  private setForm(): void {
    this.formFilterHero = new FormGroup({
      heroId: new FormControl(''),
      heroName: new FormControl(''),
    });
  }

  private subscribeFilterFormChanges(): void {
    this.formFilterHero.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((form) => {
      let herosFilter: Hero[] = [];
      if (form.heroName) {
        herosFilter = this.heroQuery.getHeroContainStringInName(form.heroName);
      }
      if (form.heroId) {
        herosFilter = this.heroQuery.getHeroById(Number(form.heroId))
          ? [this.heroQuery.getHeroById(Number(form.heroId))]
          : [];
      }
      if (form.heroId === '' && form.heroName === '') {
        herosFilter = this.heroQuery.getHeros();
      }
      this.dataSource.data = herosFilter;
    });
  }
}
