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
  public heroesSignal = signal<Hero[]>([]); // Signal para almacenar la lista de héroes
  public filteredHeroes = <Hero[]>[]; // Héroes filtrados para mostrar
  public pageSize = 5; // Tamaño de página por defecto
  public currentPage = 0; // Página actual
  public totalHeroes = 0; // Total de héroes
  public cols!: number; // Número de columnas
  public loadingSignal = this.loadingService.loading$; // Signal para el estado de carga
  public searchActive = false; // Bandera para estado de búsqueda activa

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Paginador

  constructor(
    private heroesService: HeroesService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.updateCols(window.innerWidth); // Inicializa el número de columnas según el ancho de pantalla
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth); // Actualiza el número de columnas al cambiar el tamaño de la ventana
  }

  ngOnInit(): void {
    this.loadHeroes(); // Carga inicial de héroes
  }

  loadHeroes(): void {
    this.loadingService.showLoading(); // Muestra el loader
    const heroes = this.heroesService.heroesList(); // Obtiene la lista de héroes
    this.heroesSignal.set(heroes); // Actualiza el Signal con la lista de héroes
    this.filteredHeroes = heroes; // Asigna héroes filtrados
    this.totalHeroes = heroes.length; // Calcula el total de héroes
    this.updatePaginatedHeroes(); // Actualiza la paginación
  }

  onSearchChange(searchTerm: string | null): void {
    this.searchActive = !!searchTerm; // Activa la búsqueda si hay término
    const heroes = this.heroesService.getHeroesByName(searchTerm); // Filtra héroes por nombre
    this.filteredHeroes = heroes; // Asigna los héroes filtrados
    this.totalHeroes = heroes.length; // Actualiza el total
    this.currentPage = 0; // Reinicia la página
    this.updatePaginatedHeroes(); // Actualiza la paginación
    this.paginator.firstPage(); // Reinicia el paginador
  }

  updatePaginatedHeroes(): void {
    const startIndex = this.currentPage * this.pageSize; // Índice inicial de la página
    const endIndex = startIndex + this.pageSize; // Índice final de la página
    const paginatedHeroes = this.filteredHeroes.slice(startIndex, endIndex); // Héroes paginados
    this.heroesSignal.set(paginatedHeroes); // Actualiza el Signal con los héroes paginados
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // Cambia la página actual
    this.pageSize = event.pageSize; // Cambia el tamaño de la página
    this.updatePaginatedHeroes(); // Actualiza la paginación
  }

  updateCols(width: number) {
    if (width < 600) {
      this.cols = 2; // 2 columnas en móvil
    } else if (width >= 600 && width < 960) {
      this.cols = 3; // 3 columnas en tablet
    } else {
      this.cols = 5; // 5 columnas en escritorio
    }
  }

  onDeleteHero(hero: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: hero, // Pasa el héroe al diálogo de confirmación
    });

    dialogRef.afterClosed()
      .pipe(filter((result: boolean) => result === true)) // Filtra la respuesta si es true
      .subscribe(() => {
        this.heroesService.removeHero(hero.id); // Elimina el héroe si se confirma
        this.loadHeroes(); // Recarga la lista de héroes
      });
  }
}
