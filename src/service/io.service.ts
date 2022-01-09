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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DDPPSFile } from '../app/model-file';

export interface IOEvent {
  ioAction: string;
  name?: string;
  data?: DDPPSFile;
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
