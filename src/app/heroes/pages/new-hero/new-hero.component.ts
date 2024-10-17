import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes-service.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Importa uuidv4 para generar IDs únicos
import { switchMap } from 'rxjs';

@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    power: new FormControl<string>('', { validators: [Validators.required] }),
    alt_img: new FormControl<string | null>(null, { validators: [Validators.required] }), // alt_img requerido
  });
  

  selectedImage: File | null = null; // Almacena la imagen seleccionada

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {

        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset( hero );
        return;
      });

  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onAddHero(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched(); 
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const newHero: Hero = {
        ...this.currentHero,
        id: this.currentHero.id || uuidv4(), // Solo genera un nuevo ID si no existe
        alt_img: e.target?.result as string
      };

      this.heroesService.addHero(newHero);

      this.router.navigate(['/list']);
    };

    if (this.selectedImage) {
      reader.readAsDataURL(this.selectedImage);
    } else {
      this.heroesService.addHero(this.currentHero);
      this.router.navigate(['/list']);
    }
  }


  onDeleteHero(): void {
    if (!this.currentHero.id) {
      throw new Error('Hero id is required');
    }

    this.heroesService.removeHero(this.currentHero.id); 
    this.router.navigate(['/list']); 
  }

  // Método para manejar la selección de la imagen
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
      this.heroForm.patchValue({ alt_img: this.selectedImage.name }); // Actualiza el control de la imagen en el formulario
      console.log('Imagen seleccionada:', this.selectedImage);
    }
  }
}
