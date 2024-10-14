import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';


@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styles: []
})
export class HerolistComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor( private heroesService: HeroesService ) {}

  ngOnInit(): void {

  }

}
