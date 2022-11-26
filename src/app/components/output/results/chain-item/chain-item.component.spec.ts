// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChainItemComponent } from './chain-item.component';

describe('ChainItemComponent', () => {
  let component: ChainItemComponent;
  let fixture: ComponentFixture<ChainItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChainItemComponent]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
