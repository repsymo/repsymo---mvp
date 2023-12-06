// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chain-item',
  templateUrl: './chain-item.component.html',
  styleUrls: ['./chain-item.component.css']
})
export class ChainItemComponent implements OnInit {
  @Input()
  value: string;

  constructor() {}

  ngOnInit() {}
}
