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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeUnit } from '../../../../TimeUnit';

@Component({
  selector: 'app-time-unit-selector',
  templateUrl: './time-unit-selector.component.html',
  styleUrls: ['./time-unit-selector.component.css']
})
export class TimeUnitSelectorComponent implements OnInit {

  readonly timeUnits: TimeUnit[];
  @Output()
  readonly valueChanged: EventEmitter<TimeUnit>;
  selectedValue: TimeUnit;

  constructor() {
    this.timeUnits = [
      { id: 0, label: 'Days', singular: 'Day' },
      { id: 1, label: 'Weeks', singular: 'Week' },
      { id: 2, label: 'Months', singular: 'Month' },
      { id: 3, label: 'Years', singular: 'Year' }
    ];
    this.valueChanged = new EventEmitter();
    this.selectedValue = this.timeUnits[1];
  }

  @Input()
  set value(value: number) {
    if (value >= 0 && value < this.timeUnits.length) {
      this.selectedValue = this.timeUnits[value];
      this.onChange();
    }
  }

  ngOnInit() {
    this.onChange();
  }

  onChange() {
    this.valueChanged.emit(this.selectedValue);
  }

}
