import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerolistComponent } from './hero-list.component';

describe('HerolistComponent', () => {
  let component:HerolistComponent;
  let fixture: ComponentFixture<HerolistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HerolistComponent]
    });
    fixture = TestBed.createComponent(HerolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
