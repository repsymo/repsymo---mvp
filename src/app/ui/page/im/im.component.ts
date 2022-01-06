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

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IMOption,
  IMSolver,
  Model as InvestmentModel,
  Stage
} from 'src/model/IMModel';
import { IOService } from 'src/service/io.service';
import { Example } from '../example-statement/example-statement.component';
import { InputItem } from '../input/input-pane/input-pane.component';
import { OptionsBarListener } from '../options-bar/options-bar.component';
import { Page } from '../Page';
import { Definition } from '../page-documentation/page-documentation.component';

@Component({
  selector: 'app-im',
  templateUrl: './im.component.html',
  styleUrls: ['./im.component.css'],
  host: { class: 'page' }
})
export class ImComponent extends Page implements OnInit,
                                                 OnDestroy,
                                                 OptionsBarListener {
  public static readonly MODEL_TYPE: string = 'investment';
  readonly solver: IMSolver;
  readonly model: InvestmentModel;
  readonly pageDocumentation: Definition[];
  readonly inputPaneItems: InputItem[];
  inputTableHeader: string[];
  inputDataStep: number;
  showDocumentation: boolean;
  example: Example;

  constructor(ioService: IOService) {
    super(ioService, ImComponent.MODEL_TYPE);
    this.solver = new IMSolver();
    this.model = this.newModel();
    this.pageDocumentation = this.createDocumentation();
    this.inputPaneItems = this.createInputPaneItems();
    this.inputTableHeader = [];
    this.inputDataStep = 0;
    this.showDocumentation = false;
    this.example = this.newExample();
  }

  onShowExample(n: number) {
    this.setExample(n);
    this.onSolve();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getModel() {
    return this.model;
  }

  getExample() {
    return this.example;
  }

  loadModel(modelObj: object, fileName: string, statement: string): boolean {
    const model = modelObj as InvestmentModel;

    if (!IMSolver.validateModel(model)) {
      return false;
    }
    Object.keys(model).forEach(key => this.model[key] = model[key]);
    this.example = this.newExample(0, statement, fileName);
    return true;
  }

  onSolve() {
    try {
      this.solver.solve(this.model);
      this.inputDataStep = 2;
    }
    catch (error) {
      alert(error);
    }
  }

  onReset() {
    this.clearModel();
    this.inputTableHeader = [];
    this.inputDataStep = 0;
    this.showDocumentation = false;
    this.example = this.newExample();
  }

  onToggleDocumentation() {
    this.showDocumentation = !this.showDocumentation;
  }

  onNext() {
    this.inputDataStep = 1;
    this.inputTableHeader = this.createInputTableHeader();
    this.model.plans = [];

    for (let p = 0; p < this.model.numberOfPlans; p++) {
      const options: IMOption[] = [];

      for (let o = 0; o < this.model.numberOfOptions; o++) {
        options.push(
          {
            cost: 0,
            revenue: 0
          }
        );
      }
      this.model.plans.push(
        {
          id: 0,
          options: options
        });
    }
  }

  getStageTableHeader(stage: Stage): string[] {
    const header = [
      `x<sub>${ stage.id + 1 }</sub>`
    ];

    for (let i = 1; i <= this.model.numberOfPlans; i++) {
      header.push(`Plan ${ i }`);
    }
    header.push('Revenue (maximum)');
    header.push('Plan');
    return header;
  }

  private newModel(): InvestmentModel {
    return {
      numberOfPlans: 1,
      numberOfOptions: 1,
      budget: 0,
      plans: [
        {
          id: 0,
          options: [
            {
              cost: 0,
              revenue: 0
            }
          ]
        }
      ]
    };
  }

  private clearModel() {
    this.model.numberOfPlans = 1;
    this.model.numberOfOptions = 1,
      this.model.budget = 0;
    this.model.plans = [
      {
        id: 0,
        options: [
          {
            cost: 0,
            revenue: 0
          }
        ]
      }
    ];
  }

  private createDocumentation(): Definition[] {
    return [
      {
        title: 'Number of plans',
        description: 'Number of planifications or proposals made.'
      },
      {
        title: 'Number of options',
        description: 'Number of investment options to spend the money.'
      },
      {
        title: 'Budget',
        description: 'Amount of money that will be exactly spent on the options.'
      },
      {
        title: '(C), (R)',
        description: `C stands for cost and it is the cost for the option. R stands for
                      revenue and it is the money back from applying the plan to that option.
                      For example, for plan #1 and pair (C1, R1), the plan 1 when applied to
                      the investment option #1 costs $ C1 and provides a revenue of $ R1, or
                      for plan #3 and pair (C5, R5), the plan 3 when applied to the option 5
                      costs $ C5 and provides $ R5.`
      }
    ];
  }

  private createInputPaneItems(): InputItem[] {
    return [
      {
        mkey: 'numberOfPlans',
        label: { text: 'Number of plans' }
      },
      {
        mkey: 'numberOfOptions',
        label: { text: 'Number of options' }
      },
      {
        mkey: 'budget',
        label: { text: 'Budget' }
      }
    ];
  }

  private createInputTableHeader(): string[] {
    const header: string[] = [];

    header.push('Plan');
    for (let i = 1; i <= this.model.numberOfOptions; i++) {
      header.push(`C${ i }`);
      header.push(`R${ i }`);
    }
    return header;
  }

  private newExample(number: number = -1, statement: string = '', title: string = ''): Example {
    return {
      number: number,
      title: title,
      statement: statement
    };
  }

  // Just n = 1 for now
  private setExample(n: number) {
    this.model.numberOfPlans = 4;
    this.model.numberOfOptions = 3,
      this.model.budget = 5;

    this.onNext();
    this.model.plans = [
      {
        id: 0,
        options: [
          {
            cost: 0,
            revenue: 0
          },
          {
            cost: 0,
            revenue: 0
          },
          {
            cost: 0,
            revenue: 0
          }
        ]
      },
      {
        id: 1,
        options: [
          {
            cost: 1,
            revenue: 4
          },
          {
            cost: 2,
            revenue: 7
          },
          {
            cost: 1,
            revenue: 4
          }
        ]
      },
      {
        id: 2,
        options: [
          {
            cost: 2,
            revenue: 6
          },
          {
            cost: 3,
            revenue: 9
          },
          {
            cost: -1,
            revenue: -1
          }
        ]
      },
      {
        id: 3,
        options: [
          {
            cost: -1,
            revenue: -1
          },
          {
            cost: 4,
            revenue: 10
          },
          {
            cost: -1,
            revenue: -1
          }
        ]
      }
    ];
    const statement = `A company has $5 million to invest on its three plants for a possible
                      expansion. Each plant has a number of plans or proposals about how to spend
                      the money. Each plan covers an expansion cost (C) and the supposed revenue 
                      (R). Each plant or option can only take one of its plans. The objective is to
                      maximize the final revenue of the company given its investment of $5 million.
                      If the money is not spent then it is lost money.`;
    this.example = this.newExample(n, statement);
  }
}
