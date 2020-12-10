import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WmComponent } from './wm.component';

describe('WmComponent', () => {
  let component: WmComponent;
  let fixture: ComponentFixture<WmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
