import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSettingsFormComponent } from './app-settings-form.component';

describe('AppSettingsFormComponent', () => {
  let component: AppSettingsFormComponent;
  let fixture: ComponentFixture<AppSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
