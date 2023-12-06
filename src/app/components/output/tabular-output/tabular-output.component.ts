// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

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
