import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search-heroe',
  templateUrl: './search-heroe.component.html',
  styleUrls: ['./search-heroe.component.scss']
})
export class SearchHeroeComponent {
  searchControl = new FormControl(''); // Control Reactivo

  @Output() searchChange = new EventEmitter<string | null>(); // Emitirá el término de búsqueda

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
     // Emitir el término de búsqueda cada vez que cambie
     this.searchControl.valueChanges.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged() // Solo si el valor ha cambiado
    ).subscribe(value => {
      this.searchChange.emit(value); // Emitir el valor de búsqueda
    });
  }
}
