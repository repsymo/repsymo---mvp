import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabularDynamicInputComponent } from './tabular-dynamic-input.component';

describe('TabularDynamicInputComponent', () => {
  let component: TabularDynamicInputComponent;
  let fixture: ComponentFixture<TabularDynamicInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularDynamicInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularDynamicInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
