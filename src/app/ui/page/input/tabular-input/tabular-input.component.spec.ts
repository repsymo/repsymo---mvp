import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabularInputComponent } from './tabular-input.component';

describe('TabularInputComponent', () => {
  let component: TabularInputComponent;
  let fixture: ComponentFixture<TabularInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TabularInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
