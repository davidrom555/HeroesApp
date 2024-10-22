import { LoadingService } from './../../services/loading-service.service';
import { Component, OnInit, ViewChild, HostListener, signal } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HerolistComponent implements OnInit {
  public heroesSignal = signal<Hero[]>([]);
  public loadingSignal = this.loadingService.loading$;
  public filteredHeroesSignal = <any>([]);
  public paginatedHeroesSignal = signal<Hero[]>([]);

  public pageSize = 5;  // Tamaño de página predeterminado
  public currentPage = 0;
  public totalHeroes = 0;
  public cols!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private heroesService: HeroesService,
    private loadingService: LoadingService,
    private router: Router,
    private dialog: MatDialog
  ) {

    this.updateCols(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
  }

  ngOnInit(): void {

    this.loadingService.showLoading(); // Mostrar el loader
    this.heroesSignal.set(this.heroesService.heroesList());
    this.totalHeroes = this.heroesSignal.length;
    this.updatePaginatedHeroes();
  }

  // Método para recibir el término de búsqueda desde el componente hijo
  onSearchChange(searchTerm: string | null): void {
    const heroes = this.heroesSignal();
    if (searchTerm) {
      const filtered = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.heroesSignal.set(filtered);
    }
    this.updatePaginatedHeroes();
  }

  // Actualizar los héroes que se mostrarán en la página actual
  updatePaginatedHeroes(): void {
    const filteredHeroes = this.heroesSignal();
    debugger
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHeroesSignal.set(filteredHeroes.slice(startIndex, endIndex));
  }

  // Método que se ejecuta cuando el paginador cambia de página
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedHeroes();
  }

  // Ajustar columnas según el tamaño de la pantalla
  updateCols(width: number) {
    if (width < 600) {
      this.cols = 2; // 2 columnas en mobile
    } else if (width >= 600 && width < 960) {
      this.cols = 3; // 3 columnas en tablet
    } else {
      this.cols = 5; // 5 columnas en desktop
    }
  }

  onDeleteHero(hero: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: hero,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true)
      )
      .subscribe(() => {
        this.heroesService.removeHero(hero.id);
        this.heroesSignal.set(this.heroesService.heroesList());
        this.router.navigate(['/list']);
      });
  }
}
