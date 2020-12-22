/*
 * Copyright (c) 2019-2020 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
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

import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeUnit } from 'src/app/model/TimeUnit';

export interface TimeUnitDependentLabel {
  text?: string,
  part1?: string,
  part2?: string,
  singular?: boolean
}

/**
 * Input complement that has an input element and an associated checkbox.
 */
export interface CheckboxInputItem {
  /**
   * Label to show on this input.
   */
  label: TimeUnitDependentLabel,

  /**
   * Key in which the checkbox value is found on the passed model, the bind for the checkbox is then
   * assigned with the next property 'checkboxChildKey'. For example, the checkbox will be binded to
   * 'model[checkboxParentKey][checkboxChildKey]'.
   */
  checkboxParentKey: string,

  /**
   * See InputItem.checkboxParentKey.
   */
  checkboxChildKey: string
}

/**
 * Input that has an input element.
 */
export interface InputItem {
  /**
   * Key value to bind the input data to this item, belonging to the passed model. It means that, this
   * item is binded to 'model[mkey]'.
   */
  mkey: string,

  /**
   * Label to show on this input.
   */
  label: TimeUnitDependentLabel,

  /**
   * Checkbox to add to this input.
   */
  checkbox?: CheckboxInputItem,

  /**
   * Hint for the input element.
   */
  hint?: TimeUnitDependentLabel,

  /**
   * If true, the label of this input will be rendered as two lines label for the grid view,
   * so it matches the height of the current row if required.
   */
  twoLinesLabel?: boolean;
}

@Component({
  selector: 'app-input-pane',
  templateUrl: './input-pane.component.html',
  styleUrls: ['./input-pane.component.css']
})
export class InputPaneComponent implements OnInit {

  @Output()
  readonly timeUnitChange: EventEmitter<TimeUnit>;
  @Input()
  items: InputItem[];
  @Input()
  model: object;
  @Input()
  timeunit: boolean = true;
  private readonly cdr: ChangeDetectorRef;
  private timeUnit: TimeUnit;

  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
    this.timeUnit = null;
    this.timeUnitChange = new EventEmitter();
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnit = timeUnit;
    this.timeUnitChange.emit(timeUnit);
  }

  getTUDLText(item: TimeUnitDependentLabel) {
    if (!item) {
      return '';
    }
    if (!this.timeunit) {
      return item.text;
    }
    const tu = this.timeUnit;
    const tul = (item.singular) ? tu.singular.toLowerCase() : tu.label.toLowerCase();
    const isNormalText = typeof item.text == 'string';
    return (isNormalText) ? item.text : item.part1 + tul + item.part2;
  }

}
