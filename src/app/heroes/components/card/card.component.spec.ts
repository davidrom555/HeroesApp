import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Hero } from '../../interfaces/hero.interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider'; // Importar MatDividerModule
import { HeroImagePipe } from '../../pipes/hero-image.pipe'; // Importar el pipe real o mockearlo
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent, HeroImagePipe], // Declarar el pipe
      imports: [MatCardModule, MatDividerModule, AppModule], // Importar MatDividerModule
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    // Asigna un héroe a la propiedad hero para probar el @Input
    component.hero = {
      id: '1',
      name: 'Superman',
      power: 'Super Strength',
      image: null,
      alt_img: 'superman-alt-image.png'
    } as Hero;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onDelete event when onDeleteHero is called', () => {
    spyOn(component.onDelete, 'emit');

    const heroId = component.hero.id;
    component.onDeleteHero(heroId);

    expect(component.onDelete.emit).toHaveBeenCalledWith(heroId);
  });
});
