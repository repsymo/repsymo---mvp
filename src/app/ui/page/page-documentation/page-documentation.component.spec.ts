/*
 * Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This file is part of 2DP Repsymo Solver.
 *
 * This source code is licensed under the GNU General Public License v3.0 or
 * later License found in the LICENSE file in the root directory of this source
 * tree or at https://opensource.org/licenses/GPL-3.0.
 */

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
