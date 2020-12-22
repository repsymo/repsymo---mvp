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
