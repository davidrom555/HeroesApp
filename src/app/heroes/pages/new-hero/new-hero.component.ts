import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroesService } from '../../services/heroes-service.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid'; // Genera IDs únicos
import { filter } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { LoadingService } from '../../services/loading-service.service';

@Component({
  selector: 'new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  public loadingSignal = this.loaddingService.loading$; // Signal para estado de carga
  public heroForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }), // Campo de ID
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }), // Campo de nombre
    power: new FormControl<string>('', { validators: [Validators.required] }), // Campo de poder
    alt_img: new FormControl<string | null>(null, { validators: [Validators.required] }), // Campo de imagen obligatorio
  });

  public selectedFile: File | null = null; // Archivo seleccionado
  public selectedImage: string | null = null; // Imagen seleccionada en Base64 o URL

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private loaddingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return; // Si no es modo edición, salir
    this.loaddingService.showLoading(); // Muestra el loader
    const id = this.activatedRoute.snapshot.params['id']; // Obtiene el ID de la ruta
    const hero = this.heroesService.getHeroById(id); // Obtiene héroe por ID

    if (!hero) {
      this.router.navigateByUrl('/'); // Redirige si no encuentra héroe
      return;
    }

    this.heroForm.reset(hero); // Resetea el formulario con los datos del héroe
    if (hero.alt_img) {
      this.selectedImage = hero.alt_img; // Asigna la imagen si existe
    }
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero; // Obtiene el héroe actual del formulario
  }

  onAddHero(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched(); // Marca todos los campos si son inválidos
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const newHero: Hero = {
        ...this.currentHero,
        id: this.currentHero.id || uuidv4(), // Genera un ID si no existe
        alt_img: e.target?.result as string, // Almacena la imagen en Base64
      };
  
      this.heroesService.addHero(newHero); // Añade el héroe
      this.router.navigate(['/list']); // Redirige a la lista
    };
  
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile); // Lee el archivo seleccionado
    } else {
      this.heroesService.addHero(this.currentHero); // Añade el héroe sin imagen
      this.router.navigate(['/list']); // Redirige
    }
  }

  onDeleteHero(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value, // Pasa el héroe al diálogo de confirmación
    });

    dialogRef.afterClosed()
      .pipe(filter((result: boolean) => result === true)) // Si confirma, eliminar héroe
      .subscribe(() => {
        this.heroesService.removeHero(this.heroForm.get('id')?.value); // Elimina el héroe
        this.router.navigate(['/list']); // Redirige a la lista
      });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0]; // Almacena el archivo seleccionado
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string; // Almacena la imagen en Base64
        this.heroForm.patchValue({ alt_img: this.selectedImage }); // Actualiza el formulario con la imagen
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como URL Base64
    }
  }
}
