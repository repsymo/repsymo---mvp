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

export interface OptionsBarListener {
  onShowExample(n: number): void;

  onReset(): void;

  onToggleDocumentation(): void;
}

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.css']
})
export class OptionsBarComponent implements OnInit {

  @Input()
  readonly examplesNumber: number;
  @Input()
  readonly l: OptionsBarListener;
  showExamplePopup: boolean;

  constructor() {
    this.showExamplePopup = false;
  }

  ngOnInit() {
  }

  onExampleButtonClick() {
    this.showExamplePopup = !this.showExamplePopup;
  }

  onExampleClick(e: MouseEvent) {
    const target: HTMLElement = e.target as HTMLElement;
    const number: number = parseInt(target.dataset['number']);

    this.showExamplePopup = false;
    this.l.onShowExample(number);
  }

  onReset() {
    this.l.onReset();
  }

  onShowDoc() {
    this.l.onToggleDocumentation();
  }

  onPopupTouchoutClick() {
    this.showExamplePopup = false;
  }

  getNArray(): number[] {
    return Array(this.examplesNumber).fill(0).map((_v, i) => i);
  }
}
