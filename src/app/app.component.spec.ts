import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Importar RouterTestingModule para simular las rutas

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule] // Simula el router
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });

  it(`should have as title 'HeroesApp'`, () => {
    expect(component.title).toEqual('HeroesApp'); // Verifica que el título es 'HeroesApp'
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull(); // Verifica que el router-outlet se renderiza
  });
});
