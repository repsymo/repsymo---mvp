import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsResultComponent } from './chains-result.component';

describe('ChainsResultComponent', () => {
  let component: ChainsResultComponent;
  let fixture: ComponentFixture<ChainsResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainsResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
