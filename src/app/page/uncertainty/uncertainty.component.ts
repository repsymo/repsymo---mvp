// Copyright (c) 2022 Tobias Briones. All rights reserved.
// SPDX-License-Identifier: GPL-3.0-or-later
// This file is part of https://github.com/repsymo/repsymo---mvp

import { Component, OnInit } from '@angular/core';
import {
  hurwicz,
  Hurwicz, laplace,
  Laplace,
  maximax,
  Maximax,
  maximin,
  Maximin,
  minimax,
  Minimax,
  minimin,
  Minimin, savage,
  Savage,
  Uncertainty
} from '../../../model/uncertainty/uncertainty';
import { IOService } from '../../../service/io.service';
import {
  Example
} from '../../components/example-statement/example-statement.component';
import {
  InputItem
} from '../../components/input/input-pane/input-pane.component';
import {
  OptionsBarListener
} from '../../components/options-bar/options-bar.component';
import { Page } from '../page';

@Component({
  selector: 'app-uncertainty',
  templateUrl: './uncertainty.component.html',
  styleUrls: ['./uncertainty.component.css']
})
export class UncertaintyComponent extends Page implements OnInit,
                                                          OptionsBarListener {
  public static readonly MODEL_TYPE: string = 'uncertainty';
  readonly model: Uncertainty;
  readonly inputPaneItems: InputItem[];
  inputTableHeader: string[];
  inputDataStep: number;
  alpha: number;
  example: Example;
  minimax: Minimax;
  maximin: Maximin;
  maximax: Maximax;
  minimin: Minimin;
  hurwicz: Hurwicz;
  laplace: Laplace;
  savage: Savage;

  constructor(ioService: IOService) {
    super(ioService, UncertaintyComponent.MODEL_TYPE);
    this.model = this.newModel();
    this.inputPaneItems = this.createInputPaneItems();
    this.inputTableHeader = [];
    this.inputDataStep = 0;
    this.alpha = 0.5;
    this.example = this.newExample();
    this.initSolutions();
  }

  onShowExample(n: number) {
    this.setExample(n);
    this.onSolve();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getModel() {
    return this.model;
  }

  getExample() {
    return this.example;
  }

  loadModel(modelObj: object, fileName: string, statement: string): boolean {
    // TODO
    return false;
  }

  onGainPayoffChange() {
    if (this.inputDataStep > 1) {
      this.onSolve();
    }
  }

  onSolve() {
    try {
      this.solveMinimax();
      this.solveMaximin();
      this.solveMaximax();
      this.solveMinimin();
      this.solveHurwicz();
      this.solveLaplace();
      this.solveSavage();
      this.inputDataStep = 2;
    }
    catch (error) {
      alert(error);
    }
  }

  private solveMinimax() {
    this.minimax = minimax(this.model);
  }

  private solveMaximin() {
    this.maximin = maximin(this.model);
  }

  private solveMaximax() {
    this.maximax = maximax(this.model);
  }

  private solveMinimin() {
    this.minimin = minimin(this.model);
  }

  solveHurwicz() {
    this.hurwicz = hurwicz({ ...this.model, weight: this.alpha });
  }

  private solveLaplace() {
    this.laplace = laplace(this.model);
  }

  private solveSavage() {
    this.savage = savage(this.model);
  }

  onReset() {
    this.clearModel();
    this.initSolutions();
    this.inputTableHeader = [];
    this.inputDataStep = 0;
    this.alpha = 0.5;
    this.example = this.newExample();
  }

  onToggleDocumentation() {
    // TODO
  }

  onNext() {
    this.inputDataStep = 1;
    this.inputTableHeader = this.createInputTableHeader();
    this.model.payoff = [];

    for (let i = 0; i < this.model.m; i++) {
      const states: number[] = [];

      for (let j = 0; j < this.model.n; j++) {
        states.push(0);
      }
      this.model.payoff.push({ id: i + 1, states });
    }
  }

  extendedTableHeader(label: string): string[] {
    return [...this.createInputTableHeader(), label];
  }

  private clearModel() {
    this.model.m = 0;
    this.model.n = 0;
    this.model.isGain = true;
    this.model.payoff = [];
  }

  private createInputPaneItems(): InputItem[] {
    return [
      {
        mkey: 'm',
        label: { text: 'Number of actions' }
      },
      {
        mkey: 'n',
        label: { text: 'Number of natural states' }
      }
    ];
  }

  private createInputTableHeader(): string[] {
    const header: string[] = [];

    header.push('Action');
    for (let j = 1; j <= this.model.n; j++) {
      header.push(`State ${ j }`);
    }
    return header;
  }

  private setExample(n: number) {
    const exampleModel = getExamples()[n - 1];
    this.model.m = exampleModel.model.m;
    this.model.n = exampleModel.model.n;
    this.model.isGain = exampleModel.model.isGain;
    this.onNext();
    this.model.payoff = exampleModel.model.payoff;
    this.example = exampleModel;
  }

  private newModel(): Uncertainty {
    return {
      m: 0,
      n: 0,
      payoff: []
    };
  }

  private newExample(number: number = -1, statement: string = '', title: string = ''): Example {
    return {
      number,
      title,
      statement
    };
  }

  private initSolutions() {
    this.minimax = {
      action: 0,
      maxima: [],
      minimax: 0,
      model: this.model
    };
    this.maximin = {
      action: 0,
      minima: [],
      maximin: 0,
      model: this.model
    };
    this.maximax = {
      action: 0,
      maxima: [],
      maximax: 0,
      model: this.model
    };
    this.minimin = {
      action: 0,
      minima: [],
      minimin: 0,
      model: this.model
    };
    this.hurwicz = {
      action: 0,
      weights: [],
      hurwicz: 0,
      model: this.model
    };
    this.laplace = {
      action: 0,
      expectations: [],
      laplace: 0,
      model: this.model
    };
    this.savage = {
      action: 0,
      regret: [],
      maxima: [],
      savage: 0,
      model: this.model
    };
  }
}

interface ExampleModel extends Example {
  model: Uncertainty;
}

function getExamples(): ExampleModel[] {
  return [
    {
      title: 'Student Exam vs Party',
      number: 1,
      statement: `
      Hank is an intelligent student and usually makes good grades, provided that he can 
      review the course material the night before the test. For tomorrow’s test, Hank is faced 
      with a small problem: His fraternity brothers are having an all-night party in which he 
      would like to participate. Hank has three options:
      
      a1= Party all night
      a2 = Divide the night equally between studying and partying
      a3 = Study all night
      
      Tomorrow’s exam can be easy (s1), moderate (s2), or tough (s3), depending on the 
      professor’s unpredictable mood. (Taha, 15-38).
      `,
      model: {
        m: 3,
        n: 3,
        payoff: [
          { id: 1, states: [85, 60, 40] },
          { id: 2, states: [92, 85, 81] },
          { id: 3, states: [100, 88, 82] }
        ],
        isGain: true
      }
    }
  ];
}
