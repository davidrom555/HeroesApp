import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHeroComponent } from './new-hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes-service.service';
import { LoadingService } from '../../services/loading-service.service';
import { Hero } from '../../interfaces/hero.interface';
import { signal } from '@angular/core';
import { of } from 'rxjs'; 
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { HeroesModule } from '../../heroes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';

describe('NewHeroComponent', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    const heroesServiceMock = jasmine.createSpyObj('HeroesService', ['addHero', 'removeHero', 'getHeroById', 'heroesSignal', 'updateHeroes']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'], { url: '/edit/123' });
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    const activatedRouteMock = { snapshot: { params: { id: '123' } } };
    const loadingServiceMock = jasmine.createSpyObj('LoadingService', ['showLoading', 'hideLoading'], {
      loading$: signal(true)
    });

    await TestBed.configureTestingModule({
      declarations: [NewHeroComponent],
      imports: [
        ReactiveFormsModule,
        HeroesModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: LoadingService, useValue: loadingServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
    heroesServiceSpy = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct title when editing a hero', () => {
    component.heroForm.patchValue({ id: '123', name: 'Superman' });
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Editar héroe SUPERMAN');
  });

  it('should display correct title when adding a new hero', () => {
    component.heroForm.reset();
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toContain('Agregar héroe');
  });

  it('should call heroesService.addHero on save', () => {
    const hero: Hero = {
      id: '1',
      name: 'Batman',
      power: 'Strength',
      alt_img: 'some_image.png',
      image: null // Opción que puede ser undefined o null
    };

    component.heroForm.patchValue(hero);
    component.onAddHero();

    expect(heroesServiceSpy.addHero).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: '1',
        name: 'Batman',
        power: 'Strength',
        alt_img: 'some_image.png'
        // No verificamos `image`, ya que puede ser opcional
      })
    );
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should open dialog on delete and remove hero if confirmed', () => {
    component.heroForm.patchValue({ id: '123', name: 'Superman' });
    
    // Simulamos que el diálogo se cierra con una confirmación (true)
    const dialogRefMock = { afterClosed: () => of(true) }; // Devuelve el observable correctamente
    dialogSpy.open.and.returnValue(dialogRefMock as any);

    component.onDeleteHero();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(heroesServiceSpy.removeHero).toHaveBeenCalledWith('123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/list']);
  });

  it('should handle image selection', () => {
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    const event = { target: { files: [file] } } as any;
    component.onImageSelected(event);
    fixture.detectChanges();
    expect(component.selectedFile).toBe(file);
  });

  it('should show loading spinner when loadingSignal is true', () => {
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should call showLoading on service when component is initialized', () => {
    expect(loadingServiceSpy.showLoading).toHaveBeenCalled();
  });
});
