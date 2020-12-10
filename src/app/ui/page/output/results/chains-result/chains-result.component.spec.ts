import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChainsResultComponent } from './chains-result.component';

describe('ChainsResultComponent', () => {
  let component: ChainsResultComponent;
  let fixture: ComponentFixture<ChainsResultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
             declarations: [ChainsResultComponent]
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
