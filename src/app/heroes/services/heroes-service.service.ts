import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private localStorageKey = 'heroes';

  // Signal para almacenar el estado de los héroes
  public heroesSignal = signal<Hero[]>(this.loadFromLocalStorage());

  // Computed para obtener héroes de manera reactiva
  public heroesList = computed(() => this.heroesSignal());

  constructor() {}

  // Agregar o actualizar un héroe
  addHero(hero: Hero): void {
    const currentHeroes = this.heroesSignal();
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

  // Eliminar un héroe por su ID
  removeHero(id: any): void {
    const updatedHeroes = this.heroesSignal().filter(hero => hero.id !== id);
    this.updateHeroes(updatedHeroes);
  }

  // Obtener un héroe por su ID
  getHeroById(id: string): Hero | undefined {
    return this.heroesSignal().find(h => h.id === id);
  }

  // Filtrar héroes por nombre
  getHeroesByName(name: string | null): Hero[] {
    const currentHeroes = this.heroesSignal();

    if (!name) {
      return currentHeroes;
    }

    return currentHeroes.filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Actualiza tanto el localStorage como la signal
  private updateHeroes(heroes: Hero[]): void {
    this.heroesSignal.set(heroes);
    this.saveToLocalStorage(heroes);
  }

  // Cargar héroes desde el localStorage
  private loadFromLocalStorage(): Hero[] {
    const heroes = localStorage.getItem(this.localStorageKey);
    return heroes ? JSON.parse(heroes) : [];
  }

  // Guardar héroes en el localStorage
  private saveToLocalStorage(heroes: Hero[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(heroes));
  }
  
}
