import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;
  @Output() onDelete = new EventEmitter<string | null>(); // Emitirá el término de búsqueda
 
  constructor() {}

  ngOnInit(): void {}

  onDeleteHero(hero:any){
    this.onDelete.emit(hero);
  }
}
