// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/2dp-repsymo-solver

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
