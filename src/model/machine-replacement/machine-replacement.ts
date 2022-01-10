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

import { newInvalidModelException } from './machine-replacement.exception';

export const INITIAL_DECISION_YEAR = 1;

export enum Decision {
  KEEP = 'K',
  REPLACE = 'R',
  KEEP_OR_REPLACE = 'K or R'
}

export class MachineReplacement {
  readonly decisionYears: number;
  readonly initialAge: number;
  readonly maxAge: number;
  readonly price: number;
  readonly data: MachineAgeRecord[];

  constructor(
    decisionYears = 0,
    initialAge = 0,
    maxAge = 0,
    price = 0,
    data = []
  ) {
    this.decisionYears = decisionYears;
    this.initialAge = initialAge;
    this.maxAge = maxAge;
    this.price = price;
    this.data = data;
    requireValidModel(this);
  }
}

export interface MachineAgeRecord {
  income: number;
  operationCost: number;
  sellingRevenue: number;
}

function requireValidModel(model) {
  const { decisionYears, initialAge, maxAge, price } = model;
  const requireNonNegative = (value, name) => {
    if (value < 0) {
      const msg = `${ name } is a non-negative integer: ${ value }`;
      throw newInvalidModelException(msg);
    }
  };
  const requireValidMachineAge = () => {
    if (initialAge > maxAge) {
      const msg = `
      Initial age must be less than or equals to Max age:
      Initial age ${ initialAge }, Max age ${ maxAge }
      `;
      throw newInvalidModelException(msg);
    }
  };

  requireNonNegative(decisionYears, 'decisionYears');
  requireNonNegative(initialAge, 'initialAge');
  requireNonNegative(maxAge, 'maxAge');
  requireNonNegative(price, 'price');
  requireValidMachineAge();
}
