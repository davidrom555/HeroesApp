import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core'; 
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HerolistComponent implements OnInit, OnDestroy {

  public heroes: Hero[] = [];
  public paginatedHeroes: Hero[] = [];
  public pageSize = 5;  // Tamaño de página predeterminado
  public currentPage = 0;
  public totalHeroes = 0;
  
  private heroesSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesSubscription = this.heroesService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.totalHeroes = heroes.length;
        this.updatePaginatedHeroes();
      });
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
  }

  // Actualizar los héroes que se mostrarán en la página actual
  updatePaginatedHeroes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHeroes = this.heroes.slice(startIndex, endIndex);
  }

  // Método que se ejecuta cuando el paginador cambia de página
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedHeroes();
  }
}
