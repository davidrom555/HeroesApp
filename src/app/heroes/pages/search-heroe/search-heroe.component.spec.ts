import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchHeroeComponent } from './search-heroe.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchHeroeComponent', () => {
  let component: SearchHeroeComponent;
  let fixture: ComponentFixture<SearchHeroeComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHeroeComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHeroeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search input field', () => {
    const inputElement = debugElement.query(By.css('input#searchInput'));
    expect(inputElement).not.toBeNull();
  });

  it('should emit the search term when input value changes', (done) => {
    const testValue = 'Superman';

    component.searchChange.subscribe((value) => {
      expect(value).toBe(testValue); // Verifica que el valor emitido es correcto
      done();
    });

    // Llama directamente al método que actualiza la señal
    component.updateSearch(testValue);
  });

  it('should update searchControl when input changes', () => {
    const testValue = 'Batman';

    // Llama directamente al método que actualiza la señal
    component.updateSearch(testValue);

    // Verifica que el valor de la señal se ha actualizado
    expect(component.searchControl()).toBe(testValue);
  });
});
