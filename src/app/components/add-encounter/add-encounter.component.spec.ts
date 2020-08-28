import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncounterComponent } from './add-encounter.component';

describe('AddEncounterComponent', () => {
  let component: AddEncounterComponent;
  let fixture: ComponentFixture<AddEncounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEncounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
