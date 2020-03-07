import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCardComponent } from './gestion-card.component';

describe('GestionCardComponent', () => {
  let component: GestionCardComponent;
  let fixture: ComponentFixture<GestionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
