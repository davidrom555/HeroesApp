import { Component, EventEmitter, Output, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'search-heroe',
  templateUrl: './search-heroe.component.html',
  styleUrls: ['./search-heroe.component.scss']
})
export class SearchHeroeComponent {
  searchControl = signal<string>('');

  @Output() searchChange = new EventEmitter<string | null>();

  constructor() {}

  ngOnInit(): void {
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
      fromEvent(searchInput, 'input')
        .pipe(
          debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
          distinctUntilChanged() // Solo si el valor ha cambiado
        )
        .subscribe((event: Event) => {
          const target = event.target as HTMLInputElement;
          this.updateSearch(target.value);
        });
    }
  }

  // Método para actualizar el valor de la señal
  updateSearch(value: string) {
    this.searchControl.set(value);
    this.searchChange.emit(value.trim() || null); // Emitir null si el valor es vacío
  }
}
