import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerolistComponent } from './hero-list.component';
import { HeroesService } from '../../services/heroes-service.service';
import { LoadingService } from '../../services/loading-service.service';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Para simular observables de parámetros
import { RouterTestingModule } from '@angular/router/testing'; // Simulación del enrutador
import { signal } from '@angular/core';
import { SearchHeroeComponent } from '../search-heroe/search-heroe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeroesModule } from '../../heroes.module';

describe('HerolistComponent', () => {
  let component: HerolistComponent;
  let fixture: ComponentFixture<HerolistComponent>;
  let heroesService: Partial<HeroesService>;
  let loadingService: Partial<LoadingService>;
  

  const mockHeroes: Hero[] = [
    { id: '1', name: 'Superman', power: 'Fly', image: null, alt_img: 'superman.png' },
    { id: '2', name: 'Batman', power: 'Wealth', image: null, alt_img: 'batman.png' },
  ];

  beforeEach(async () => {
    // Simula HeroesService con una propiedad computada
    heroesService = {
      heroesList: signal(mockHeroes),
      getHeroesByName: jasmine.createSpy('getHeroesByName').and.returnValue(mockHeroes),
      removeHero: jasmine.createSpy('removeHero'),
      addHero: jasmine.createSpy('addHero'),
    };

    // Simula LoadingService con un signal
    loadingService = {
      loading$: signal(false), 
      showLoading: jasmine.createSpy('showLoading'),
    };

    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HerolistComponent, SearchHeroeComponent],
      imports: [
        HeroesModule,
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: HeroesService, useValue: heroesService },
        { provide: LoadingService, useValue: loadingService },
        { provide: MatDialog, useValue: dialogSpy },
        { 
          provide: ActivatedRoute, 
          useValue: {
            params: of({ id: '123' }), // Simulación de los parámetros de ruta
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HerolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading spinner when loading', () => {
    // Cambia el estado del signal loading$ a true
    (loadingService.loading$ as any).set(true);
    fixture.detectChanges(); 

    const compiled = fixture.debugElement.nativeElement;

    const spinner = compiled.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });
});
