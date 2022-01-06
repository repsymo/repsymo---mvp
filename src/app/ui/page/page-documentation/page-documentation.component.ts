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

export interface Definition {
  'title': string,
  'description': string
}

@Component({
  selector: 'app-page-documentation',
  templateUrl: './page-documentation.component.html',
  styleUrls: ['./page-documentation.component.css']
})
export class PageDocumentationComponent implements OnInit {

  classes: string[];
  @Input()
  items: Definition[];
  private readonly animationTimeMS: number;

  constructor() {
    this.animationTimeMS = 300;
  }

  @Input()
  set hidden(hide: boolean) {
    if (hide) {
      this.classes = ['hide'];
      setTimeout(() => {
        this.classes.push('gone');
      }, this.animationTimeMS);
    }
    else {
      this.classes.pop();
      setTimeout(() => {
        this.classes = [];
      }, this.animationTimeMS);
    }
  }

  ngOnInit() {
  }

}
