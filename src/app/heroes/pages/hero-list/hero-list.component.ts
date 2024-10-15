import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styles: []
})
export class HerolistComponent implements OnInit, OnDestroy {

  public heroes: Hero[] = [];
  private heroesSubscription!: Subscription;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesSubscription = this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnDestroy(): void {
    // Asegurarse de desuscribirse para evitar fugas de memoria
    this.heroesSubscription.unsubscribe();
  }
}
