import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes-service.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Importa uuidv4 para generar IDs únicos
import { filter } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  public loadingSignal = this.loaddingService.loading$;
  public heroForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    power: new FormControl<string>('', { validators: [Validators.required] }),
    alt_img: new FormControl<string | null>(null, { validators: [Validators.required] }), // alt_img requerido
  });

  public selectedImage: File | null = null; // Almacena la imagen seleccionada

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private loaddingService: LoadingService
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.loaddingService.showLoading();
    const id = this.activatedRoute.snapshot.params['id'];
    const hero = this.heroesService.getHeroById(id);

    if (!hero) {
      this.router.navigateByUrl('/');
      return;
    }

    this.heroForm.reset(hero);
  }

  // Computado para obtener el héroe actual del formulario
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
        alt_img: e.target?.result as string,
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result === true)
      )
      .subscribe(() => {
        this.heroesService.removeHero(this.heroForm.get('id')?.value);
        this.router.navigate(['/list']);
      });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedImage = input.files[0];
      // Leer la imagen seleccionada como URL temporal para previsualización
      const reader = new FileReader();
      reader.onload = (e) => {
        // Establecer la imagen en el formulario (url de la imagen)
        this.heroForm.patchValue({ alt_img: e.target?.result as string });
      };
      reader.readAsDataURL(this.selectedImage); // Convertir la imagen a Base64 para mostrarla inmediatamente
    }
  }
}
