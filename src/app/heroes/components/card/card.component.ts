import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero; // Recibe el héroe desde el componente padre

  @Output() onDelete = new EventEmitter<string | null>(); // Emite un evento cuando se elimina el héroe

  constructor() {}

  ngOnInit(): void {} // Ciclo de vida de inicialización, sin lógica aún

  onDeleteHero(hero: any) {
    this.onDelete.emit(hero); // Emite el héroe al componente padre para ser eliminado
  }
}
