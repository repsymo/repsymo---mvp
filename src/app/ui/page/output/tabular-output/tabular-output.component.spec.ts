import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabularOutputComponent } from './tabular-output.component';

describe('TabularOutputComponent', () => {
  let component: TabularOutputComponent;
  let fixture: ComponentFixture<TabularOutputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
             declarations: [TabularOutputComponent]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
