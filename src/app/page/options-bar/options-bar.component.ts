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

  ngOnInit() {}

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

  onPopupTouchOutClick() {
    this.showExamplePopup = false;
  }

  getNArray(): number[] {
    return Array(this.examplesNumber).fill(0).map((_v, i) => i);
  }
}
