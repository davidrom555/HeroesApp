import { Component, EventEmitter, Output, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';

@Component({
  selector: 'search-heroe',
  templateUrl: './search-heroe.component.html',
  styleUrls: ['./search-heroe.component.scss']
})
export class SearchHeroeComponent {
  searchControl = signal<string>(''); // Signal para almacenar el término de búsqueda

  @Output() searchChange = new EventEmitter<string | null>(); // Emite el cambio de búsqueda al componente padre

  constructor() {}

  ngOnInit(): void {
    const searchInput = document.getElementById('searchInput'); // Obtiene el input de búsqueda

    if (searchInput) {
      fromEvent(searchInput, 'input')
        .pipe(
          debounceTime(300), // Espera 300ms antes de procesar la entrada
          distinctUntilChanged() // Solo emite si el valor cambió
        )
        .subscribe((event: Event) => {
          const target = event.target as HTMLInputElement;
          this.updateSearch(target.value); // Actualiza la búsqueda
        });
    }
  }

  // Actualiza el valor del Signal y emite el cambio
  updateSearch(value: string) {
    this.searchControl.set(value); // Actualiza el Signal con el nuevo valor
    this.searchChange.emit(value.trim() || null); // Emite el valor o null si está vacío
  }
}
