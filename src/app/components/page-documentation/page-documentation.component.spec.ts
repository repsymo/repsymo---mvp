// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageDocumentationComponent } from './page-documentation.component';

describe('PageDocumentationComponent', () => {
  let component: PageDocumentationComponent;
  let fixture: ComponentFixture<PageDocumentationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PageDocumentationComponent]
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
