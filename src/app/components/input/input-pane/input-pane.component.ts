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

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { TimeUnit } from 'src/app/TimeUnit';

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
   * Key in which the checkbox value is found on the passed model, the bind for
   * the checkbox is then assigned with the next property 'checkboxChildKey'.
   * For example, the checkbox will be binded to
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
   * Key value to bind the input data to this item, belonging to the passed
   * model. It means that, this item is binded to 'model[mkey]'.
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
   * If true, the label of this input will be rendered as two lines label for
   * the grid view, so it matches the height of the current row if required.
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
  private readonly cdr: ChangeDetectorRef;

  @Input()
  items: InputItem[];

  @Input()
  model: object;

  @Input()
  timeunit: boolean = true;

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
