// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

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
  private readonly animationTimeMS: number;
  classes: string[];

  @Input()
  items: Definition[];

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

  ngOnInit() {}
}
