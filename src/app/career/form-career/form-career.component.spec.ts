import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCareerComponent } from './form-career.component';

describe('FormCareerComponent', () => {
  let component: FormCareerComponent;
  let fixture: ComponentFixture<FormCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
