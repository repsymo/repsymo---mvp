import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmComponent } from './wm.component';

describe('WmComponent', () => {
  let component: WmComponent;
  let fixture: ComponentFixture<WmComponent>;

  beforeEach(async(() => {
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
