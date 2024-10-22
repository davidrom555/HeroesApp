import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Hero } from '../../interfaces/hero.interface';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  let mockData: Hero;

  beforeEach(() => {
    // Crear un mock para MatDialogRef
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    // Simulación de los datos del héroe inyectados
    mockData = {
      id: '1',
      name: 'Superman',
      power: 'Super Strength',
      image: null,
      alt_img: 'superman-alt-image.png'
    } as Hero;

    TestBed.configureTestingModule({
      declarations: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData } // Simular los datos inyectados
      ]
    });

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog with false when onNoClick is called', () => {
    component.onNoClick(); // Llamar al método
    expect(mockDialogRef.close).toHaveBeenCalledWith(false); // Verifica que el diálogo se cerró con "false"
  });

  it('should close the dialog with true when onConfirm is called', () => {
    component.onConfirm(); // Llamar al método
    expect(mockDialogRef.close).toHaveBeenCalledWith(true); // Verifica que el diálogo se cerró con "true"
  });

  it('should display the hero name in uppercase', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('b').textContent).toContain('SUPERMAN');
  });
});
