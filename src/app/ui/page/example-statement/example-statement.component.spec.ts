import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleStatementComponent } from './example-statement.component';

describe('ExampleStatementComponent', () => {
  let component: ExampleStatementComponent;
  let fixture: ComponentFixture<ExampleStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleStatementComponent ]
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
