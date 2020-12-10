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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabular-input',
  templateUrl: './tabular-input.component.html',
  styleUrls: ['./tabular-input.component.css']
})
export class TabularInputComponent implements OnInit {

  /*
   * Types of expected inputs:
   *
   * Single column
   * rows = [ 0, 0, ..., 0 ]
   * 
   * Single column with objects
   * rows = [ { keyValue: 0 }, { keyValue: 0 }, ..., { keyValue: 0 } ]
   * 
   * Multi-column
   * rows = [ { 'c1': 0, 'c2': 0, 'c3': 0 }, ...,  { 'c1': 0, 'c2': 0, 'c3': 0 } ]
   */
  readonly keys: any;
  @Input()
  readonly header: string[];
  @Input()
  readonly rows: object[];
  @Input()
  readonly keyValue: string;
  @Input()
  readonly multiColumn: boolean;

  constructor() {
    this.keys = Object.keys;
  }

  @Input()
  set timeUnit(timeUnit: string) {
    this.header[0] = `${ this.header[0] } (${ timeUnit.toLowerCase() })`;
  }

  ngOnInit() {
  }

  isSingleColumn(): boolean {
    return !this.multiColumn;
  }

  isSingleColumnWithKey(): boolean {
    return !this.multiColumn && typeof this.keyValue == 'string';
  }

  isMultiColumn(): boolean {
    return this.multiColumn;
  }

}
