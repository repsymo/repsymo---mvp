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
import { TimeUnit } from '../../../TimeUnit';
import {
  Stage,
  WMProportionalityOption,
  WMSolver,
  WorkforceModel,
  WorkforcePerTU
} from '../../../../model/WMSolver';
import { IoService } from '../../service/io/io.service';
import { Example } from '../example-statement/example-statement.component';
import {
  InputItem,
  TimeUnitDependentLabel
} from '../input/input-pane/input-pane.component';
import { OptionsBarListener } from '../options-bar/options-bar.component';
import { Page } from '../Page';
import { Definition } from '../page-documentation/page-documentation.component';

@Component({
  selector: 'app-wm',
  templateUrl: './wm.component.html',
  styleUrls: ['./wm.component.css'],
  host: { class: 'page' }
})
export class WmComponent extends Page implements OnInit,
                                                 OnDestroy,
                                                 OptionsBarListener {
  public static readonly MODEL_TYPE: string = 'workforce';
  readonly solver: WMSolver;
  readonly model: WorkforceModel;
  readonly pageDocumentation: Definition[];
  readonly inputPaneItems: InputItem[];
  readonly inputTableHeader: string[];
  showDocumentation: boolean;
  inputDataStep: number;
  example: Example;
  timeUnitLabel: string;

  constructor(ioService: IoService) {
    super(ioService, WmComponent.MODEL_TYPE);
    this.solver = new WMSolver();
    this.model = this.newModel();
    this.pageDocumentation = this.createDocumentation();
    this.inputPaneItems = this.createInputItems();
    this.inputTableHeader = this.createInputTableHeader();
    this.showDocumentation = false;
    this.inputDataStep = 0;
    this.example = this.newExample();
    this.timeUnitLabel = '';
  }

  onShowExample(n: number) {
    this.setExample(n);
    this.inputDataStep++;
    this.onSolve();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  getModel() {
    // If current model is empty don't return it so it is not downloaded
    if (!WMSolver.validateModel(this.model)) {
      return null;
    }
    return this.model;
  }

  getExample() {
    return this.example;
  }

  loadModel(modelObj: object, fileName: string, statement: string): boolean {
    const model = modelObj as WorkforceModel;

    if (!WMSolver.validateModel(model)) {
      return false;
    }
    Object.keys(model).forEach(key => this.model[key] = model[key]);
    this.example = this.newExample(0, statement, fileName);
    return true;
  }

  onSolve() {
    try {
      this.solver.solve(this.model);

      // The step is 2 at this point
      this.inputDataStep = (
                             this.inputDataStep < 2
                           ) ? 2 : this.inputDataStep;
    }
    catch (error) {
      alert(error);
    }
  }

  onReset() {
    this.inputDataStep = 0;
    //this._timeUnitId = -1;
    this.example = this.newExample();
    this.clearModel();
  }

  onToggleDocumentation() {
    this.showDocumentation = !this.showDocumentation;
  }

  onNext() {
    // The step is 1 at this point
    this.inputDataStep = (
                           this.inputDataStep < 1
                         ) ? 1 : this.inputDataStep;
    this.initInputDataArray();
  }

  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnitLabel = timeUnit.label;
  }

  getStageTableHeader(stage: Stage): string[] {
    return [
      `x<sub>${ stage.id }</sub>`,
      'Cost (demand, cost)',
      'f (minimum cost)',
      `x<sub>${ stage.id + 1 }</sub>`
    ];
  }

  getReportTableHeader(): string[] {
    return [
      this.timeUnitLabel,
      'Minimum demand',
      'Current demand',
      'Interpretation',
      'Cost'
    ];
  }

  getReportTableRows(): string[] {
    const stages = this.solver.getStages().slice().reverse();
    const rows = [];

    stages.forEach(stage => {
      rows.push({
        'timeunit': stage.id + 1,
        'minimumDemand': stage.minimumDemand,
        'currentDemand': this.solver.getPath()[stage.id],
        'interpretation': this.solver.getInterpretation()[stage.id],
        'cost': this.solver.getCost()[stage.id]
      });
    });
    return rows;
  }

  private newModel(): WorkforceModel {
    const propOptions: WMProportionalityOption = {
      fireEmployeeCostToCurrentStage: false
    };
    return {
      amountOfAnalysisTime: 1,
      initialNumberOfEmployees: 0,
      manpowerExcessCost: 0,
      newEmployeeFixedCost: 0,
      newEmployeePerTUCost: 0,
      fireEmployeeCost: 0,
      quitEmployeesPerTU: 0,
      workforcePerTU: [] // init
      //proportionalityOptions: propOptions
    };
  }

  private clearModel() {
    this.model.amountOfAnalysisTime = 1;
    this.model.initialNumberOfEmployees = 0;
    this.model.manpowerExcessCost = 0;
    this.model.newEmployeeFixedCost = 0;
    this.model.newEmployeePerTUCost = 0;
    this.model.fireEmployeeCost = 0;
    this.model.quitEmployeesPerTU = 0;
    this.model.workforcePerTU = [];
  }

  private newExample(number: number = -1, statement: string = '', title: string = ''): Example {
    return {
      number: number,
      title: title,
      statement: statement
    };
  }

  private createDocumentation(): Definition[] {
    return [
      {
        title: 'Unit of time',
        description: 'Label to represent the problem in terms of time'
      },
      {
        title: 'Number of "time units" to analyse',
        description: 'Amount of time to compute the model. For example, 5 weeks'
      },
      {
        title: 'Initial number of employees',
        description: 'Number of employees already working before computing the model'
      },
      {
        title: 'Manpower excess cost',
        description: `Cost for manpower per unit of time. For example, it costs 50$ to pay for 
                      manpower per week, to be considered when hiring new employees`
      },
      {
        title: 'Fixed cost for hiring a new employee',
        description: 'Cost that is paid only once when a new employee is being hired'
      },
      {
        title: 'Variable cost for hiring a new employee per unit of time',
        description: `Cost to pay for each hired employee per unit of time (eg. week, year)`
      },
      {
        title: 'Cost for firing an employee',
        description: `When the company fires an employee, they receive a benefit in terms of money
                      that it is an expense if the company decides to fire or laid off staff`
      },
      {
        title: 'Number of employees who decide to quit per unit of time',
        description: `Some employees regularly quit their job. For example, 5 employees quit each
                      year, so they will not get the "Cost for firing an employee" money when
                      leaving the job`
      }
    ];
  }

  private createInputItems(): InputItem[] {
    const labels: TimeUnitDependentLabel[] = [
      {
        part1: 'Amount of ',
        part2: ' to analyse'
      },
      {
        text: 'Initial number of employees'
      },
      {
        part1: 'Manpower excess cost per worker per ',
        part2: '',
        singular: true
      },
      {
        text: 'Fixed cost for hiring a new employee'
      },
      {
        part1: 'Variable cost for hiring a new employee per ',
        part2: '',
        singular: true
      },
      {
        text: 'Cost for firing an employee'
      },
      {
        part1: 'Number of employees who decide to quit per ',
        part2: '',
        singular: true
      }
    ];
    return [
      {
        mkey: 'amountOfAnalysisTime',
        label: labels[0]
      },
      {
        mkey: 'initialNumberOfEmployees',
        label: labels[1]
      },
      {
        mkey: 'manpowerExcessCost',
        label: labels[2]
      },
      {
        mkey: 'newEmployeeFixedCost',
        label: labels[3]
      },
      {
        mkey: 'newEmployeePerTUCost',
        label: labels[4]
      },
      {
        mkey: 'fireEmployeeCost',
        label: labels[5],
        twoLinesLabel: true
        // checkbox: {
        //   label: {
        //     part1: 'Proportional to the current ',
        //     part2: '',
        //     singular: true
        //   },
        //   checkboxParentKey: 'proportionalityOptions',
        //   checkboxChildKey: 'fireEmployeeCostToCurrentStage'
        // }
      },
      {
        mkey: 'quitEmployeesPerTU',
        label: labels[6]
      }
    ];
  }

  private createInputTableHeader(): string[] {
    return [
      'Time t',
      'Workforce required (employees)'
    ];
  }

  private initInputDataArray() {
    const inputData: WorkforcePerTU[] = Array(this.model.amountOfAnalysisTime);

    for (let i = 0; i < inputData.length; i++) {
      inputData[i] = {
        timeunit: i + 1,
        workforce: 0
      };
    }
    this.model.workforcePerTU = inputData;
  }

  private setExample(n: number) {
    let sampleData: WorkforcePerTU[];

    switch (n) {
      case 1:
        //this._timeUnitId = 1;
        this.model.amountOfAnalysisTime = 5;
        this.model.manpowerExcessCost = 300;
        this.model.newEmployeeFixedCost = 400;
        this.model.newEmployeePerTUCost = 200;
        this.model.initialNumberOfEmployees = 0;
        this.model.fireEmployeeCost = 0;
        this.model.quitEmployeesPerTU = 0;
        this.example = this.newExample(
          1,
          `A construction contractor estimates that the workforce required 
            over the next 5 weeks is 5, 7, 8, 4 and 6 workers respectively.
            Excess labor kept on the force will cost $300 per worker per
            week, and new hiring in any week will incur a fixed cost of
            $400 plus $200 per worker per week. Compute a hiring plan that
            minimizes the cost.`
        );
        sampleData = [
          {
            timeunit: 1,
            workforce: 5
          },
          {
            timeunit: 2,
            workforce: 7
          },
          {
            timeunit: 3,
            workforce: 8
          },
          {
            timeunit: 4,
            workforce: 4
          },
          {
            timeunit: 5,
            workforce: 6
          }
        ];
        break;

      case 2:
        // this._timeUnitId = 3;
        this.model.amountOfAnalysisTime = 5;
        this.model.manpowerExcessCost = 0;
        this.model.newEmployeeFixedCost = 9000;
        this.model.newEmployeePerTUCost = 108000;
        this.model.initialNumberOfEmployees = 30;
        this.model.fireEmployeeCost = 25000;
        this.model.quitEmployeesPerTU = 3;
        this.example = this.newExample(
          2,
          `A company requires 28, 30, 25, 29 and 20 workers for the next
            5 years respectively. Currently there are 30 employees. Each
            worker earns $108,000 a year. When starting each year, a worker
            may be hired or fired. It costs $9,000 to hire a worker and
            $25,000 to fire him, because of insurance and benefits. As the
            job is significantly tiring, each year 3 workers quit the job
            (which don't receive the firing money). Find the optimal solution
            for hiring employees along the 5 years.`
        );
        sampleData = [
          {
            timeunit: 1,
            workforce: 28
          },
          {
            timeunit: 2,
            workforce: 30
          },
          {
            timeunit: 3,
            workforce: 25
          },
          {
            timeunit: 4,
            workforce: 29
          },
          {
            timeunit: 5,
            workforce: 20
          }
        ];
        break;

      default:
        sampleData = [];
        break;
    }
    const inputData: WorkforcePerTU[] = Array(this.model.amountOfAnalysisTime);

    for (let i = 0; i < inputData.length; i++) {
      inputData[i] = {
        timeunit: i + 1,
        workforce: sampleData[i].workforce
      };
    }
    this.model.workforcePerTU = inputData;
  }
}
