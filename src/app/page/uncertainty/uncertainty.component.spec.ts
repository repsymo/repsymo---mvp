// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncertaintyComponent } from './uncertainty.component';

describe('UncertaintyComponent', () => {
  let component: UncertaintyComponent;
  let fixture: ComponentFixture<UncertaintyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncertaintyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncertaintyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
