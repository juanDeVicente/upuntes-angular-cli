import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegistryComponent } from './finish-registry.component';

describe('FinishRegistryComponent', () => {
  let component: FinishRegistryComponent;
  let fixture: ComponentFixture<FinishRegistryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishRegistryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
