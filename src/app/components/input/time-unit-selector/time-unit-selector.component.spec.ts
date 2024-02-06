// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimeUnitSelectorComponent } from './time-unit-selector.component';

describe('TimeUnitSelectorComponent', () => {
  let component: TimeUnitSelectorComponent;
  let fixture: ComponentFixture<TimeUnitSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TimeUnitSelectorComponent]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
