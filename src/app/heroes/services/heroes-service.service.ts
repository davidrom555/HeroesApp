import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

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

  addHero(hero: Hero): void {
    const currentHeroes = this.heroesSubject.getValue();
    const existingHeroIndex = currentHeroes.findIndex(h => h.id === hero.id);

    if (existingHeroIndex !== -1) {
      // Si el héroe ya existe, lo actualizamos
      currentHeroes[existingHeroIndex] = hero;
    } else {
      // Si no existe, lo añadimos
      currentHeroes.push(hero);
    }

    this.updateHeroes([...currentHeroes]); // Asegurarse de crear una nueva referencia al array
  }

  removeHero(id: string): void {
    const updatedHeroes = this.heroesSubject.getValue().filter(hero => hero.id !== id);
    this.updateHeroes(updatedHeroes);
  }

  // Actualiza tanto el localStorage como el BehaviorSubject
  private updateHeroes(heroes: Hero[]): void {
    this.heroesSubject.next(heroes);
    this.saveToLocalStorage(heroes);
  }

  private loadFromLocalStorage(): Hero[] {
    const heroes = localStorage.getItem(this.localStorageKey);
    return heroes ? JSON.parse(heroes) : [];
  }

  private saveToLocalStorage(heroes: Hero[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    const currentHeroes = this.heroesSubject.getValue();
    const hero = currentHeroes.find(h => h.id === id);
    return of(hero); 
  }
}
