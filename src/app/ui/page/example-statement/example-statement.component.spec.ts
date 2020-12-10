import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExampleStatementComponent } from './example-statement.component';

describe('ExampleStatementComponent', () => {
  let component: ExampleStatementComponent;
  let fixture: ComponentFixture<ExampleStatementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
             declarations: [ExampleStatementComponent]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
