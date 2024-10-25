import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {
  // El método transform recibe un objeto 'hero' de tipo Hero y devuelve un string.
  transform(hero: Hero): string {
    // Retorna la imagen alternativa 'alt_img' si existe; de lo contrario, retorna una cadena vacía.
    return hero.alt_img || '';
  }
}
