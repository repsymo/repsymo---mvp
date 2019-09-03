import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrmComponent } from './mrm.component';

describe('MrmComponent', () => {
  let component: MrmComponent;
  let fixture: ComponentFixture<MrmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
