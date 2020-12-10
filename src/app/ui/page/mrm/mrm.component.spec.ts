/*
 * Copyright (C) 2019-2020 Tobias Briones. All rights reserved.
 *
 * This file is part of 2DP Repsymo Solver.
 *
 * 2DP Repsymo Solver is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * 2DP Repsymo Solver is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with 2DP Repsymo Solver.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MrmComponent } from './mrm.component';

describe('MrmComponent', () => {
  let component: MrmComponent;
  let fixture: ComponentFixture<MrmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
             declarations: [MrmComponent]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
