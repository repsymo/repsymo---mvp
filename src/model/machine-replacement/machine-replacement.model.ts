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

export const INITIAL_DECISION_YEAR = 1;

export enum Decision {
  KEEP = 'K',
  REPLACE = 'R',
  KEEP_OR_REPLACE = 'K or R'
}

export interface MachineReplacementModel {
  decisionYears: number;
  initialAge: number;
  maxAge: number;
  price: number;
  data: MachineAgeRecord[];
}

export function newMachineReplacementModel(): MachineReplacementModel {
  return {
    decisionYears: 0,
    initialAge: 0,
    maxAge: 0,
    price: 0,
    data: []
  };
}

export interface MachineAgeRecord {
  income: number;
  operationCost: number;
  sellingRevenue: number;
}
