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

import { WmComponent } from '../ui/page/wm/wm.component';
import { ImComponent } from '../ui/page/im/im.component';

export interface DDPPSFile {
  appVersion: string,
  modelType: string,
  statement: string,
  problemModel: object
}

export class DDPPS implements DDPPSFile {

  private static readonly MODEL_TYPES: string[] = [
    ImComponent.MODEL_TYPE,
    WmComponent.MODEL_TYPE
  ];

  public static validate(data: object): boolean {
    // Shallow check
    const member = 'appVersion' in data
      && 'modelType' in data
      && 'statement' in data
      && 'problemModel' in data;

    if (!member) {
      return false;
    }
    const ddpps = data as DDPPS;

    // Check model type (investment, workforce, etc)
    if (DDPPS.MODEL_TYPES.findIndex(v => v == ddpps.modelType) == -1) {
      return false;
    }
    return true;
  }

  public readonly appVersion: string;
  public readonly modelType: string;
  public readonly statement: string;
  public readonly problemModel: object;

  constructor(appVersion: string, modelType: string, statement: string, problemModel: object) {
    this.appVersion = appVersion;
    this.modelType = modelType;
    this.statement = statement;
    this.problemModel = problemModel;
  }
}
