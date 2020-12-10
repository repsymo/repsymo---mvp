import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImComponent } from './im.component';

describe('ImComponent', () => {
  let component: ImComponent;
  let fixture: ComponentFixture<ImComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
             declarations: [ImComponent]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
