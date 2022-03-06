import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientfileComponent } from './patientfile.component';

describe('PatientfileComponent', () => {
  let component: PatientfileComponent;
  let fixture: ComponentFixture<PatientfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
