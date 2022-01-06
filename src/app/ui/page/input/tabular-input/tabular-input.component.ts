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
