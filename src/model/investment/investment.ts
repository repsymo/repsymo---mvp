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

// Experimental model for now
export interface Investment {
  numberOfPlans: number;
  numberOfOptions: number;
  budget: number;
  plans: Plan[];
}

export interface Option {
  cost: number;
  revenue: number;
}

export interface Plan {
  id: number;
  options: Option[];
}
