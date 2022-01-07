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
  selector: 'app-tabular-output',
  templateUrl: './tabular-output.component.html',
  styleUrls: ['./tabular-output.component.css']
})
export class TabularOutputComponent implements OnInit {
  @Input()
  readonly header: string[];

  @Input()
  readonly rows: object[];

  constructor() {}

  ngOnInit() {}

  keys(object: object): any {
    return Object.keys(object);
  }
}
