import { Component, OnInit, ViewChild, HostListener, signal } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter } from 'rxjs';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HerolistComponent implements OnInit {
  public heroesSignal = signal<Hero[]>([]);
  public filteredHeroes = <Hero[]>[];
  public pageSize = 5;
  public currentPage = 0;
  public totalHeroes = 0;
  public cols!: number;
  public loadingSignal = this.loadingService.loading$;
  public searchActive = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private heroesService: HeroesService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.updateCols(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loadingService.showLoading();
      const heroes = this.heroesService.heroesList();
      this.heroesSignal.set(heroes);
      this.filteredHeroes = heroes;
      this.totalHeroes = heroes.length;
      this.updatePaginatedHeroes();
  }

  // Método para recibir el término de búsqueda desde el componente hijo
  onSearchChange(searchTerm: string | null): void {
      this.searchActive = !!searchTerm; // Activar búsqueda si hay un término
      const heroes = this.heroesService.getHeroesByName(searchTerm);
      this.filteredHeroes = heroes;
      this.totalHeroes = heroes.length;
      this.currentPage = 0; // Reiniciar paginación
      this.updatePaginatedHeroes();
      this.paginator.firstPage();
    }

  // Actualizar los héroes que se mostrarán en la página actual
  updatePaginatedHeroes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedHeroes = this.filteredHeroes.slice(startIndex, endIndex);
    this.heroesSignal.set(paginatedHeroes);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedHeroes();
  }

  updateCols(width: number) {
    if (width < 600) {
      this.cols = 2; // 2 columnas en mobile
    } else if (width >= 600 && width < 960) {
      this.cols = 3; // 3 columnas en tablet
    } else {
      this.cols = 5; // 5 columnas en desktop
    }
  }

  onDeleteHero(hero: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed()
      .pipe(filter((result: boolean) => result === true))
      .subscribe(() => {
        this.heroesService.removeHero(hero.id);
        this.loadHeroes();
      });
  }
}
