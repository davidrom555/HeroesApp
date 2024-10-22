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

  public selectedFile: File | null = null; // Para almacenar el archivo seleccionado
  public selectedImage: string | null = null; // Para almacenar la representación en Base64 o URL de la imagen


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
    // Si el héroe tiene una imagen previa la asigna a selectedImage
    if (hero.alt_img) {
      this.selectedImage = hero.alt_img; // Establecer la URL de la imagen si existe
    }
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
        alt_img: e.target?.result as string, // Almacena el resultado del FileReader en Base64
      };
  
      this.heroesService.addHero(newHero);
      this.router.navigate(['/list']);
    };
  
    // Usa selectedFile (que es de tipo File) en lugar de selectedImage
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile); // Lee el archivo seleccionado como URL Base64
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
      this.selectedFile = input.files[0]; // Almacenar el archivo seleccionado
      const reader = new FileReader();
      reader.onload = (e) => {
        // Asignar la representación en Base64 de la imagen seleccionada
        this.selectedImage = e.target?.result as string;
        // Actualiza el formulario con la representación de la imagen en Base64
        this.heroForm.patchValue({ alt_img: this.selectedImage });
      };
      reader.readAsDataURL(this.selectedFile); // Lee el archivo como una URL de datos (Base64)
    }
  }
}
