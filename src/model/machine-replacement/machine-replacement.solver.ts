// Copyright (c) 2019-2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import {
    Decision,
    INITIAL_DECISION_YEAR,
    MachineReplacement,
    requireValidModel,
} from "./machine-replacement";

export interface TreeNode {
    machineAge: number;
    decisionYear: number;
    k?: TreeNode;
    r?: TreeNode;
}

export function newTreeNode(): TreeNode {
    return {
        machineAge: 0,
        decisionYear: 0,
        k: null,
        r: null,
    };
}

export interface SolutionStageRow {
    t: number;
    k: number;
    r: number;
    max: number;
    decision: Decision;
}

/**
 * Solves a MachineReplacement model.
 *
 * It yields an array of stages containing the
 * computations for each decision year from which you can follow the respective
 * optimum solution, and it should be represented as a table.
 *
 * It yields a solutions tree containing the possibilities (Keep or Replace) per
 * decision year than can be taken from a given year. The root node is the
 * initial year. It should be represented as a tree plotted on a
 * machine-age-vs-decision-year plane. The particular model's solution(s) can be
 * followed along this tree which contains all solutions space for
 * informational purposes.
 *
 * See Taha p.482 for the model's recursive equations.
 *
 * Current version came from Example Project: Machine Replacement Model
 * (https://github.com/tobiasbriones/ep-machine-replacement-model).
 *
 * @author Tobias Briones
 */
export class MachineReplacementSolver {
    stages: SolutionStageRow[][];
    solutionsTree: any[];
    private model: MachineReplacement;

    constructor() {
        this.model = new MachineReplacement();
        this.stages = [];
        this.solutionsTree = [];
    }

    solve(model: MachineReplacement) {
        requireValidModel(model);
        this.init(model);

        this.createDecisionTree();
        this.solveStages();
    }

    /**
     * Use this function to get the actual tree for now. Notice this is twice
     * work.
     */
    getSolutionsTree(): TreeNode {
        const rootNode: TreeNode = {
            decisionYear: 1,
            machineAge: this.model.initialAge,
        };
        this.setTreeNodeChildren(rootNode);
        return rootNode;
    }

    private init(model) {
        this.model = model;
        this.stages = [];
        this.solutionsTree = [];
        const { decisionYears } = model;

        for (let i = 0;
             i < decisionYears;
             i++) {
            this.solutionsTree[i] = [];
            this.stages[i] = [];
        }
    }

    private createDecisionTree() {
        const initialNode: TreeNode = {
            machineAge: this.model.initialAge,
            decisionYear: INITIAL_DECISION_YEAR,
        };
        const sortDecisionYearByAge = solutionsTree => {
            solutionsTree.forEach(element => element.sort(
                    (a, b) => (
                        a.machineAge > b.machineAge
                    ) ? 1 : -1,
                ),
            );
        };

        this.fillPath(initialNode);
        sortDecisionYearByAge(this.solutionsTree);
    }

    private fillPath(node: TreeNode) {
        const { decisionYear } = node;

        if (decisionYear > this.model.decisionYears) {
            return;
        }

        const nextDecisionYear = decisionYear + 1;
        const kNode: TreeNode = {
            machineAge: node.machineAge + 1,
            decisionYear: nextDecisionYear,
        };
        const rNode: TreeNode = {
            machineAge: 1,
            decisionYear: nextDecisionYear,
        };

        this.addNodeIfNotExists(node, decisionYear);
        if (kNode.machineAge <= this.model.maxAge) {
            this.fillPath(kNode);
            node.k = kNode;
        }
        this.fillPath(rNode);
        node.r = rNode;
    }

    private addNodeIfNotExists(node: TreeNode, decisionYear: number) {
        const decisionYearPosition = decisionYear - 1;

        if (!this.containsNode(node, decisionYearPosition)) {
            this.solutionsTree[decisionYearPosition].push(node);
        }
    }

    private containsNode(node: TreeNode, position: number) {
        return this.solutionsTree[position].some(
            e => e.decisionYear === node.decisionYear
                && e.machineAge === node.machineAge,
        );
    }

    private solveStages() {
        const years = this.model.decisionYears;

        for (let i = years - 1;
             i >= 0;
             i--) {
            const stage = this.stages[i];
            const nextStage = (
                i < years - 1
            ) ? this.stages[i + 1] : null;

            this.solveStage(stage, nextStage, i);
        }
    }

    private solveStage(
        stage: SolutionStageRow[],
        nextStage: SolutionStageRow[],
        i: number,
    ) {
        const maxMachineAge = this.model.maxAge;
        const values = this.solutionsTree[i];
        const isLastStage = nextStage === null;
        const canKeepOneMoreYear = t => t < maxMachineAge;
        const getNextStageMaxByAge = age => nextStage.find(row => row.t
            === age).max;
        const getMax = (k, r) => k === false ? r : Math.max(k, r);
        const getK = t => {
            const data = this.model.data;

            if (!canKeepOneMoreYear(t)) {
                return false;
            }
            if (isLastStage) {
                return data[t].income +
                    data[t + 1].sellingRevenue -
                    data[t].operationCost;
            }
            const nextMax = getNextStageMaxByAge(t + 1);
            return data[t].income - data[t].operationCost + nextMax;
        };
        const getR = t => {
            const data = this.model.data;

            if (isLastStage) {
                return data[0].income +
                    data[t].sellingRevenue +
                    data[1].sellingRevenue -
                    data[0].operationCost -
                    this.model.price;
            }
            const nextMax = getNextStageMaxByAge(1);
            return data[0].income +
                data[t].sellingRevenue -
                data[0].operationCost -
                this.model.price +
                nextMax;
        };
        const getDecision = (k, r, t) => {
            if (k === false) {
                return Decision.REPLACE;
            }
            const hasToReplaceMachine = () => r > k;
            const hasToKeepMachine = () => k > r;
            const hasToKeepOrReplaceMachine = () => k === r;
            let decision;

            if (hasToReplaceMachine()) {
                decision = Decision.REPLACE;
            }
            else if (hasToKeepMachine()) {
                decision = Decision.KEEP;
            }
            else if (hasToKeepOrReplaceMachine()) {
                decision = Decision.KEEP_OR_REPLACE;
            }
            return decision;
        };

        for (let j = 0;
             j < values.length;
             j++) {
            const t = values[j].machineAge as number;
            const kVal = getK(t) as number;
            const k = canKeepOneMoreYear(t) ? kVal : -1;
            const r = getR(t) as number;
            const max = getMax(k, r) as number;
            const decision = getDecision(k, r, t) as Decision;
            stage[j] = {
                t,
                k,
                r,
                max,
                decision,
            };
        }
    }

    private setTreeNodeChildren(node: TreeNode) {
        const nextDecisionYear = node.decisionYear + 1;
        const kNode: TreeNode = {
            decisionYear: nextDecisionYear,
            machineAge: node.machineAge + 1,
        };
        const rNode: TreeNode = {
            decisionYear: nextDecisionYear,
            machineAge: 1,
        };
        node.k = kNode;
        node.r = rNode;
        if (nextDecisionYear <= this.model.decisionYears) {
            this.setTreeNodeChildren(kNode);
            this.setTreeNodeChildren(rNode);
        }
    }
}
