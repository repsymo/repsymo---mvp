import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeUnitSelectorComponent } from './time-unit-selector.component';

describe('TimeUnitSelectorComponent', () => {
  let component: TimeUnitSelectorComponent;
  let fixture: ComponentFixture<TimeUnitSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeUnitSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
