// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

// Super basic decision-making under uncertainty approaches

export interface Uncertainty {
    payoff: Action[];
    m?: number; // # of Actions
    n?: number; // # of States
    isGain?: boolean;
}

export interface Action {
    id: number;
    states: number[];
}

export interface Minimax {
    model: Uncertainty;
    maxima: number[];
    action: number;
    minimax: number;
}

export interface Maximin {
    model: Uncertainty;
    minima: number[];
    action: number;
    maximin: number;
}

export interface Maximax {
    model: Uncertainty;
    maxima: number[];
    action: number;
    maximax: number;
}

export interface Minimin {
    model: Uncertainty;
    minima: number[];
    action: number;
    minimin: number;
}

export function minimax(model: Uncertainty): Minimax {
    const payoff = model.payoff;
    const maxima = [];

    for (let a = 0;
         a < payoff.length;
         a++) {
        const max = maxIndex(payoff[a].states);
        maxima.push(payoff[a].states[max]);
    }
    const min = minIndex(maxima);
    return {
        model,
        maxima,
        action: min,
        minimax: maxima[min],
    };
}

export function maximin(model: Uncertainty): Maximin {
    const payoff = model.payoff;
    const minima = [];

    for (let a = 0;
         a < payoff.length;
         a++) {
        const min = minIndex(payoff[a].states);
        minima.push(payoff[a].states[min]);
    }
    const max = maxIndex(minima);
    return {
        model,
        minima,
        action: max,
        maximin: minima[max],
    };
}

export function maximax(model: Uncertainty): Maximax {
    const payoff = model.payoff;
    const maxima = [];

    for (let a = 0;
         a < payoff.length;
         a++) {
        const max = maxIndex(payoff[a].states);
        maxima.push(payoff[a].states[max]);
    }
    const max = maxIndex(maxima);
    return {
        model,
        maxima,
        action: max,
        maximax: maxima[max],
    };
}

export function minimin(model: Uncertainty): Minimin {
    const payoff = model.payoff;
    const minima = [];

    for (let a = 0;
         a < payoff.length;
         a++) {
        const min = minIndex(payoff[a].states);
        minima.push(payoff[a].states[min]);
    }
    const min = minIndex(minima);
    return {
        model,
        minima,
        action: min,
        minimin: minima[min],
    };
}

export interface HurwiczUncertainty extends Uncertainty {
    weight: number;
}

export interface Hurwicz {
    model: Uncertainty;
    weights: number[];
    action: number;
    hurwicz: number;
}

export function hurwicz(model: HurwiczUncertainty) {
    const { payoff, weight } = model;
    const weights: number[] = [];
    const calculateWeight = (a, min, max) => {
        if (model.isGain) {
            return weight * payoff[a].states[max] + (
                1 - weight
            ) * payoff[a].states[min];
        }
        return weight * payoff[a].states[min] + (
            1 - weight
        ) * payoff[a].states[max];
    };

    for (let a = 0;
         a < payoff.length;
         a++) {
        const max = maxIndex(payoff[a].states);
        const min = minIndex(payoff[a].states);
        const w = calculateWeight(a, min, max);
        weights.push(w);
    }
    const max = maxIndex(weights);
    return {
        model,
        weights,
        action: max,
        hurwicz: weights[max],
    };
}

export interface Laplace {
    model: Uncertainty;
    expectations: number[];
    action: number;
    laplace: number;
}

export function laplace(model: Uncertainty) {
    const expectations = [];

    for (const a of
        model.payoff) {
        expectations.push(uniformExpectation(a.states));
    }
    const max = maxIndex(expectations);
    return {
        model,
        expectations,
        action: max,
        laplace: expectations[max],
    };
}

export interface Savage {
    model: Uncertainty;
    regret: Action[];
    maxima: number[];
    action: number;
    savage: number;
}

export function savage(model: Uncertainty): Savage {
    const { payoff, isGain } = model;
    const maxColumn = idx => maxIndex(payoff.map(row => row.states[idx]));
    const minColumn = idx => minIndex(payoff.map(row => row.states[idx]));
    const gainValue = (
        i,
        j,
    ) => payoff[maxColumn(j)].states[j] - payoff[i].states[j];
    const lossValue = (
        i,
        j,
    ) => payoff[i].states[j] - payoff[minColumn(j)].states[j];
    const regretMatrix = () => {
        const matrix: Action[] = [];

        for (let i = 0;
             i < model.m;
             i++) {
            matrix.push({ id: i + 1, states: [] });
            for (let j = 0;
                 j < model.n;
                 j++) {
                const value = isGain ? gainValue(i, j) : lossValue(i, j);
                matrix[i].states.push(value);
            }
        }
        return matrix;
    };
    const regret = regretMatrix();
    const mm = minimax({ payoff: regret });
    return {
        model,
        regret,
        maxima: mm.maxima,
        action: mm.action,
        savage: mm.minimax,
    };
}

function minIndex(vec: number[]): number {
    if (vec.length === 0) {
        return NaN;
    }
    let index = 0;
    let min = vec[index];
    vec.forEach((value, idx) => {
        if (value < min) {
            index = idx;
            min = value;
        }
    });
    return index;
}

function maxIndex(vec: number[]): number {
    if (vec.length === 0) {
        return NaN;
    }
    let index = 0;
    let max = vec[index];
    vec.forEach((value, idx) => {
        if (value > max) {
            index = idx;
            max = value;
        }
    });
    return index;
}

function uniformExpectation(vec: number[]) {
    const p = 1 / vec.length;
    return p * vec.reduce((a, b) => a + b, 0);
}
