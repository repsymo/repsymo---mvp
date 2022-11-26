// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModelFile } from '../app/model-file';

export interface IOEvent {
  ioAction: string;
  name?: string;
  data?: ModelFile;
}

@Injectable({
  providedIn: 'root'
})
export class IOService {
  public readonly io: Subject<IOEvent>;

  constructor() {
    this.io = new BehaviorSubject(null);
  }
}
