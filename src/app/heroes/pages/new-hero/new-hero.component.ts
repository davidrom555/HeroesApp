import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes-service.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { v4 as uuidv4 } from 'uuid'; // Importa uuidv4 para generar IDs únicos

@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
  styles: []
})
export class NewHeroComponent implements OnInit {

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    hero: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<string>('', { validators: [Validators.required] }),
    power: new FormControl<string>('', { validators: [Validators.required] }),
  });

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  // Método para agregar un nuevo héroe
  onAddHero(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched(); // Marca el formulario si es inválido
      return;
    }

    const newHero: Hero = {
      ...this.currentHero,
      id: uuidv4() // Generar un ID único con uuidv4
    };

    this.heroesService.addHero(newHero);
    
    // Opcional: Navegar a la lista de héroes o resetear el formulario
    this.router.navigate(['/heroes']);
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.heroesService.removeHero(this.currentHero.id);
      this.router.navigate(['/heroes']);
    });
  }
}
