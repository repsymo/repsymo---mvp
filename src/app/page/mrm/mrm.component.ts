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

import { Component, OnInit } from '@angular/core';
import {
  Decision,
  MachineAgeRecord,
  MachineReplacement,
  MachineReplacementSolver
} from '../../../model/machine-replacement';
import { IOService } from '../../../service/io.service';
import {
  Example
} from '../../components/example-statement/example-statement.component';
import {
  InputItem,
  TimeUnitDependentLabel
} from '../../components/input/input-pane/input-pane.component';
import {
  OptionsBarListener
} from '../../components/options-bar/options-bar.component';
import { TimeUnit } from '../../time-unit';
import { Page } from '../page';
import { SolutionsTreeCanvas } from './mrm-canvas';

@Component({
  selector: 'app-mrm',
  templateUrl: './mrm.component.html',
  styleUrls: ['./mrm.component.css']
})
export class MrmComponent extends Page implements OnInit,
                                                  OptionsBarListener {
  static readonly MODEL_TYPE: string = 'machine-replacement';
  readonly inputPaneItems: InputItem[];
  readonly inputTableHeader: string[];
  readonly solver: MachineReplacementSolver;
  model: MachineReplacement;
  inputDataStep: number;
  timeUnitLabel: string;

  constructor(ioService: IOService) {
    super(ioService, MrmComponent.MODEL_TYPE);
    this.model = new MachineReplacement();
    this.inputPaneItems = this.createInputItems();
    this.inputTableHeader = this.createInputTableHeader();
    this.solver = new MachineReplacementSolver();
    this.inputDataStep = 0;
  }

  getExample(): Example {
    // TODO
    return undefined;
  }

  getModel(): MachineReplacement {
    return this.model;
  }

  loadModel(modelObj: object, fileName: string, statement: string): boolean {
    // TODO
    return false;
  }

  onReset(): void {
    this.model = new MachineReplacement();
    this.inputDataStep = 0;
  }

  ngOnInit() {}

  onShowExample(n: number): void {
    // Just one example currently
    this.setDefaultModelInputs();
    this.setDefaultModelData();
    this.onSolve();
  }

  onToggleDocumentation(): void {
    // TODO
  }

  onSolve() {
    try {
      this.solver.solve(this.model);
      this.inputDataStep = (this.inputDataStep < 2) ? 2 : this.inputDataStep;
    }
    catch (error) {
      alert(error);
    }
    setTimeout(() => {
      this.updateSolutionsTree();
      this.updateResultChains();
    }, 200); // gotcha >:
  }

  onNext() {
    this.inputDataStep = (this.inputDataStep < 1) ? 1 : this.inputDataStep;
    this.initInputDataArray();
  }

  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnitLabel = timeUnit.label;
  }

  getStageTableHeader() {
    return [
      't',
      'K',
      'R',
      'max',
      'Decision'
    ];
  }

  private createInputItems(): InputItem[] {
    const labels: TimeUnitDependentLabel[] = [
      {
        part1: 'Number of decision ',
        part2: ' '
      },
      {
        part1: 'Maximum machine age in ',
        part2: ' '
      },
      {
        part1: 'Initial machine age in ',
        part2: ' '
      },
      {
        text: `New machine's price in dollars`
      }
    ];
    return [
      {
        mkey: 'decisionYears',
        label: labels[0]
      },
      {
        mkey: 'maxAge',
        label: labels[1]
      },
      {
        mkey: 'initialAge',
        label: labels[2]
      },
      {
        mkey: 'price',
        label: labels[3]
      }
    ];
  }

  private initInputDataArray() {
    const inputData: MachineAgeRecord[] = Array(this.model.maxAge + 1);

    for (let i = 0; i < inputData.length; i++) {
      inputData[i] = {
        income: 0,
        operationCost: 0,
        sellingRevenue: 0
      };
    }
    this.model.data = inputData;
  }

  private createInputTableHeader() {
    return [
      `Time t`,
      'Income ($)',
      'Operation cost ($)',
      'Selling revenue ($)'
    ];
  }

  private setDefaultModelInputs() {
    this.model.decisionYears = 4;
    this.model.maxAge = 6;
    this.model.initialAge = 3;
    this.model.price = 100000;
  }

  private setDefaultModelData() {
    this.model.data = [
      { income: 20000, operationCost: 200, sellingRevenue: -1 },
      { income: 19000, operationCost: 600, sellingRevenue: 80000 },
      { income: 18500, operationCost: 1200, sellingRevenue: 60000 },
      { income: 17200, operationCost: 1500, sellingRevenue: 50000 },
      { income: 15500, operationCost: 1700, sellingRevenue: 30000 },
      { income: 14000, operationCost: 1800, sellingRevenue: 10000 },
      { income: 12200, operationCost: 2200, sellingRevenue: 5000 }
    ];
  }

  private updateSolutionsTree() {
    const canvasEl = document.getElementById('solutionsTree') as HTMLCanvasElement;
    const canvas = new SolutionsTreeCanvas();

    canvas.rootNode = this.solver.getSolutionsTree();
    canvas.init(canvasEl);
    canvas.solutionMark.init(this.solver.stages);

    canvas.render();
  }

  private updateResultChains() {
    const el = getResultChainsEl(this.solver.stages, this.model.initialAge);
    const parent = document.querySelector('.chains-container');

    parent.textContent = '';
    parent.appendChild(el);
  }
}

// From EP: MRM //

function getSpanEl(text) {
  const el = document.createElement('span');

  el.innerText = text;
  return el;
}

function deepCopyOf(el) {
  return el.cloneNode(true);
}

function getResultChainsEl(stages, initialAge) {
  return (
    () => {
      const chains = [];

      collectDecisionChains(chains, 0, initialAge);
      return getChainsEl(chains);
    }
  )();

  function getChainsEl(chains) {
    const el = getChainsParentElement();

    collectSingleChainElements(el, chains);
    return el;
  }

  function getChainsParentElement() {
    return document.createElement('div');
  }

  function getSingleChainParentEl() {
    const el = document.createElement('div');

    el.classList.add('chain');
    return el;
  }

  function getRow(i, t) {
    return stages[i].find(stage => stage.t === t);
  }

  function getSingleChainFinalChild() {
    const el = document.createElement('div');

    el.classList.add('end');
    el.innerText = 'SELL';
    return el;
  }

  function collectDecisionChains(chains, start, time) {
    if (start >= stages.length) {
      return;
    }
    const decision = getRow(start, time).decision;
    let age = time;

    switch (decision) {
      case Decision.KEEP:
        age += 1;
        break;

      case Decision.REPLACE:
        age = 1;
        break;

      case Decision.KEEP_OR_REPLACE:
        const newChainK = [];
        const newChainR = [];

        collectDecisionChains(newChainK, start + 1, age + 1);
        collectDecisionChains(newChainR, start + 1, 1);
        chains.push(
          {
            k: newChainK,
            r: newChainR
          }
        );
        return;
    }
    chains.push(decision);
    collectDecisionChains(chains, start + 1, age);
  }

  function collectSingleChainElements(parentEl, chains) {
    const initialChainEl = getSingleChainParentEl();

    appendSingleChainElements(parentEl, initialChainEl, chains);
  }

  function appendSingleChainElements(parentEl, singleChainParentEl, chains) {
    let isSingleChainParentElDone = false;

    const isChainValue = chainItem => typeof chainItem === 'string';
    const getChainValueEl = chainValue => getSpanEl(chainValue);
    const appendSingleChainFinalChild = el => el.appendChild(
      getSingleChainFinalChild());
    const appendSingleChainChild = (el, chainValue) => el.appendChild(
      getChainValueEl(chainValue));
    const appendSingleChain = (parentEl, singleChainEl) => parentEl.appendChild(
      singleChainEl);
    const appendChainRecursive = (parentEl, singleChainParentEl, chainValue, chains) => {
      appendSingleChainChild(singleChainParentEl, chainValue);
      appendSingleChainElements(parentEl, singleChainParentEl, chains);
    };
    const appendComposedChainRecursive = (parentEl, singleChainParentEl, chainItem) => {
      const newSingleChainEl = deepCopyOf(singleChainParentEl);

      appendChainRecursive(
        parentEl,
        singleChainParentEl,
        Decision.KEEP,
        chainItem.k
      );
      appendChainRecursive(
        parentEl,
        newSingleChainEl,
        Decision.REPLACE,
        chainItem.r
      );
    };

    for (const chainItem of chains) {
      if (isChainValue(chainItem)) {
        appendSingleChainChild(singleChainParentEl, chainItem);
      }
      else {
        appendComposedChainRecursive(parentEl, singleChainParentEl, chainItem);
        isSingleChainParentElDone = true;
      }
    }
    if (!isSingleChainParentElDone) {
      appendSingleChainFinalChild(singleChainParentEl);
      appendSingleChain(parentEl, singleChainParentEl);
    }
  }
}
