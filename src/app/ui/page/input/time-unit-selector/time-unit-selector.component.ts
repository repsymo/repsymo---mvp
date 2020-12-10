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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeUnit } from '../../../../model/TimeUnit';

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
