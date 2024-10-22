import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesignPageComponent } from './design-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DesignPageComponent', () => {
  let component: DesignPageComponent;
  let fixture: ComponentFixture<DesignPageComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DesignPageComponent],
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two sidebar options', () => {
    // Verifica directamente la longitud de la propiedad sidebarOptions
    expect(component.sidebarOptions.length).toBe(2);
    expect(component.sidebarOptions[0].label).toBe('Héroes');
    expect(component.sidebarOptions[1].label).toBe('Nuevo Héroe');
  });

  it('should display the correct labels in the sidebar', () => {
    const sidebarItems = debugElement.queryAll(By.css('mat-list-item'));

    expect(sidebarItems.length).toBe(2); // Asegurarse de que hay 2 elementos en la lista
    expect(sidebarItems[0].nativeElement.textContent).toContain('Héroes');
    expect(sidebarItems[1].nativeElement.textContent).toContain('Nuevo Héroe');
  });

  it('should toggle the sidenav when the button is clicked', () => {
    const sidenav = debugElement.query(By.css('mat-sidenav')).componentInstance;

    // Espia el método toggle del sidenav
    spyOn(sidenav, 'toggle');

    const toggleButton = debugElement.query(By.css('button[mat-icon-button]')).nativeElement;
    toggleButton.click();

    expect(sidenav.toggle).toHaveBeenCalled();
  });
});
