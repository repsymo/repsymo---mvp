import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDocumentationComponent } from './page-documentation.component';

describe('PageDocumentationComponent', () => {
  let component: PageDocumentationComponent;
  let fixture: ComponentFixture<PageDocumentationComponent>;

  beforeEach(async(() => {
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
