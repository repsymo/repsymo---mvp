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

export interface Example {
  number: number,
  statement: string,
  title?: string
}

@Component({
  selector: 'app-example-statement',
  templateUrl: './example-statement.component.html',
  styleUrls: ['./example-statement.component.css']
})
export class ExampleStatementComponent implements OnInit {

  example: Example;
  gone: boolean;

  constructor() {
  }

  @Input()
  set value(example: Example) {
    this.example = example;
    if (example.title) {
      example.number = 0;
    }
    this.gone = example.number == -1;
  }

  ngOnInit() {
  }

}
