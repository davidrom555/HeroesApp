import { Injectable, signal, computed } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  
  public heroesSignal = signal<Hero[]>([]);  // Signal para almacenar la lista de héroes

  public heroesList = computed(() => this.heroesSignal()); // Computed para obtener la lista de héroes

  constructor() {}

  addHero(hero: Hero): void {
    const currentHeroes = this.heroesSignal(); // Obtiene los héroes actuales
    const existingHeroIndex = currentHeroes.findIndex(h => h.id === hero.id); // Busca si el héroe ya existe

    if (existingHeroIndex !== -1) {
      currentHeroes[existingHeroIndex] = hero; // Actualiza el héroe si ya existe
    } else {
      currentHeroes.push(hero); // Agrega el héroe si no existe
    }

    this.updateHeroes([...currentHeroes]); // Actualiza la signal con una nueva referencia
  }

  removeHero(id: any): void {
    const updatedHeroes = this.heroesSignal().filter(hero => hero.id !== id); // Filtra héroes y elimina por ID
    this.updateHeroes(updatedHeroes); // Actualiza la signal con la lista filtrada
  }

  getHeroById(id: string): Hero | undefined {
    return this.heroesSignal().find(h => h.id === id); // Busca un héroe por su ID
  }

  getHeroesByName(name: string | null): Hero[] {
    const currentHeroes = this.heroesSignal(); // Obtiene los héroes actuales

    if (!name) {
      return currentHeroes; // Devuelve todos los héroes si no hay nombre de búsqueda
    }

    return currentHeroes.filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase()) // Filtra héroes por nombre
    );
  }

  private updateHeroes(heroes: Hero[]): void {
    this.heroesSignal.set(heroes); // Actualiza la signal con la nueva lista de héroes
  }
}
