import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {

  private localStorageKey = 'heroes';
  private heroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(this.loadFromLocalStorage());

  constructor() {}

  getHeroes(): Observable<Hero[]> {
    return this.heroesSubject.asObservable();
  }

  // servicio para agregar héroes y actualizar el localStorage
  addHero(hero: Hero): void {
    const currentHeroes = this.heroesSubject.getValue();
    const updatedHeroes = [...currentHeroes, hero];
    this.updateHeroes(updatedHeroes);
  }

  // servicio para eliminar un héroe por ID
  removeHero(id: string): void {
    const updatedHeroes = this.heroesSubject.getValue().filter(hero => hero.id !== id);
    this.updateHeroes(updatedHeroes);
  }

  // Actualiza tanto el localStorage como el BehaviorSubject
  private updateHeroes(heroes: Hero[]): void {
    this.heroesSubject.next(heroes);
    this.saveToLocalStorage(heroes);
  }

  // Cargar héroes desde el localStorage
  private loadFromLocalStorage(): Hero[] {
    const heroes = localStorage.getItem(this.localStorageKey);
    return heroes ? JSON.parse(heroes) : [];
  }

  private saveToLocalStorage(heroes: Hero[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
  }
}
