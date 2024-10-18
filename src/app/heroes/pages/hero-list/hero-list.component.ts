import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core'; 
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HerolistComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public heroes: Hero[] = [];
  public paginatedHeroes: Hero[] = [];
  public filteredHeroes: Hero[] = [];
  public pageSize = 5;  // Tamaño de página predeterminado
  public currentPage = 0;
  public totalHeroes = 0;
  public cols!: number;

  private heroesSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService,
              private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
    this.updateCols(window.innerWidth); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateCols(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.loadingService.showLoading(); // Mostrar el loader
    this.heroesSubscription = this.heroesService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.filteredHeroes = heroes; // Inicialmente todos los héroes
        this.totalHeroes = heroes.length;
        this.updatePaginatedHeroes();
      });
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
  }

  // Método para recibir el término de búsqueda desde el componente hijo
  onSearchChange(searchTerm: string | null): void {
    if (searchTerm) {
      this.filteredHeroes = this.heroes.filter(hero => 
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredHeroes = this.heroes; // Si no hay búsqueda, mostrar todos
    }
    this.updatePaginatedHeroes();
  }

  // Actualizar los héroes que se mostrarán en la página actual
  updatePaginatedHeroes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHeroes = this.filteredHeroes.slice(startIndex, endIndex);
  }

  // Método que se ejecuta cuando el paginador cambia de página
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
      this.cols = 5; // 4 columnas en desktop
    }
  }
}
