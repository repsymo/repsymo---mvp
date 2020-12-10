import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageDocumentationComponent } from './page-documentation.component';

describe('PageDocumentationComponent', () => {
  let component: PageDocumentationComponent;
  let fixture: ComponentFixture<PageDocumentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
