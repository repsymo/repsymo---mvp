// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Investment, Option } from "./investment";

export interface Stage {
    id: number;
    rows: StageRow[];
}

export interface StageRow {
    budget: number;
    revenue: number[];
    f: number;
    option: number;
}

export class InvestmentSolver {
    private model: Investment;
    private stages: Stage[];
    private path: number[];

    constructor() {
        this.reset();
    }

    // IMOption is validated when solving to avoid over iterations
    public static validateModel(model: Investment): boolean {
        return model.numberOfPlans > 0
            && model.numberOfOptions > 0
            && model.budget >= 0
            && model.plans.length === model.numberOfPlans
            && model.plans.filter(v => v.options.length
                !== model.numberOfOptions).length === 0;
    }

    public getStages(): Stage[] {
        return this.stages;
    }

    public getPath(): number[] {
        return this.path;
    }

    public solve(problemModel: Investment) {
        if (!InvestmentSolver.validateModel(problemModel)) {
            throw new Error("Invalid investment model");
        }
        const initStages = () => {
            this.stages = [];

            for (let i = 0;
                 i < problemModel.numberOfOptions;
                 i++) {
                const rows: StageRow[] = [];
                const addRow = (budget: number) => {
                    const revenue: number[] = Array(problemModel.numberOfPlans)
                        .fill(-1);

                    rows.push({
                        budget,
                        revenue,
                        f: 0,
                        option: 0,
                    });
                };

                // Fill the stage rows
                if ((
                    i + 1
                ) < problemModel.numberOfOptions) {
                    for (let budget = 0;
                         budget <= problemModel.budget;
                         budget++) {
                        addRow(budget);
                    }
                }
                else {
                    addRow(problemModel.budget);
                }
                this.stages.push({
                    id: i,
                    rows,
                });
            }
        };
        const solveStages = () => {
            this.stages.forEach(stage => this.solveStage(stage));
        };
        this.reset();
        this.model = problemModel;

        initStages();
        solveStages();
        this.createPath();
    }

    private reset() {
        this.model = null;
        this.stages = [];
        this.path = [];
    }

    private isAvailableOption(option: Option): boolean {
        return option.cost >= 0 && option.revenue >= 0;
    }

    private solveStage(stage: Stage) {
        const getFormerRevenue = (budget: number, plan: Option): number => {
            if (stage.id === 0) {
                return 0;
            }
            const remaining = budget - plan.cost;
            return this.stages[stage.id - 1].rows[remaining].f;
        };

        stage.rows.forEach(row => {
            const investmentOption = stage.id;
            const budget = row.budget;
            const options = row.revenue;
            let max = -1;
            let bestPlan = -1;

            // Each option is the revenue value gotten if the corresponding
            // plan is possible for the problem, -1 otherwise
            options.forEach((_option, i) => {
                const plan = this.model.plans[i].options[investmentOption];

                if (plan.cost === -1 || plan.cost > budget) {
                    row.revenue[i] = -1;
                    return;
                }
                const totalRevenue = getFormerRevenue(
                    budget,
                    plan,
                ) + plan.revenue;
                row.revenue[i] = totalRevenue;

                if (totalRevenue > max) {
                    max = totalRevenue;
                    bestPlan = i;
                }
            });
            row.f = max;
            row.option = bestPlan;
        });
    }

    private createPath() {
        const lastStageIndex = this.stages.length - 1;
        let moneyLeft = this.model.budget;
        let lastOption = -1;

        lastOption = this.stages[lastStageIndex].rows[0].option;
        moneyLeft = moneyLeft
            - this.model.plans[lastOption].options[lastStageIndex].cost;

        this.path.push(lastOption + 1);
        for (let i = this.stages.length - 2;
             i >= 0;
             i--) {
            const stage = this.stages[i];
            lastOption = stage.rows[moneyLeft].option;
            moneyLeft = moneyLeft - this.model.plans[lastOption].options[i].cost;

            this.path.push(lastOption + 1);
        }
        this.path.reverse();
    }
}
