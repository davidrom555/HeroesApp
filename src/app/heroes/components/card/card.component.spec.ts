import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Hero } from '../../interfaces/hero.interface';
describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    // Agregar un héroe para las pruebas
    component.hero = {
      id: '1',
      name: 'Superman',
      power: 'Super Strength',
      image: null, 
      alt_img: 'superman-alt-image.png'
    } as Hero;

    fixture.detectChanges(); // Detectar cambios en el componente
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onDelete event when onDeleteHero is called', () => {
    spyOn(component.onDelete, 'emit'); // Espiar el método emit

    const heroId = component.hero.id;
    component.onDeleteHero(heroId);

    expect(component.onDelete.emit).toHaveBeenCalledWith(heroId); // Verificar que se emitió el evento con el ID correcto
  });
});
