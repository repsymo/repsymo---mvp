import { Component, OnInit } from '@angular/core';
import { WMSolver, Model, WorkforcePerTU } from '../solver/WMSolver';
import { TimeUnit } from '../model/TimeUnit';
import { Definition } from '../page-documentation/page-documentation.component';

@Component({
  selector: 'app-wm',
  templateUrl: './wm.component.html',
  styleUrls: ['./wm.component.css'],
  host: { class: 'page' }
})
export class WmComponent implements OnInit {
  
  private readonly solver: WMSolver;
  readonly pageDocumentation: Definition[];
  private timeToAnalyse: number;
  private manpowerExcessCost: number;
  private newEmployeeFixedCost: number;
  private newEmployeePerWeekCost: number;
  private initialEmployees: number;
  private fireEmployeeCost: number;
  private quitEmployees: number;
  private inputData: WorkforcePerTU[];
  inputDataStep: number;
  timeUnitLabel: string;
  showDocumentation: boolean;
  
  constructor() {
    this.solver = new WMSolver();
    this.pageDocumentation = this.createDocArray();
    this.timeToAnalyse = 5;
    this.manpowerExcessCost = 0;
    this.newEmployeeFixedCost = 9000;
    this.newEmployeePerWeekCost = 108000;
    this.initialEmployees = 30;
    this.fireEmployeeCost = 25000;
    this.quitEmployees = 3;
    this.inputData = [];
    this.inputDataStep = 0;
    this.timeUnitLabel = '';
    this.showDocumentation = false;
  }

  private createDocArray(): Definition[] {
    return [
      {
        title: 'Unit of time',
        description: 'Label to represent the problem in terms of time'
      },
      {
        title: 'Number of "time units" to analyse',
        description: 'Amount of time to compute the model. For example 5 weeks'
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

  private initInputDataArray() {
    this.inputData = Array(this.timeToAnalyse);
    const sampleData: WorkforcePerTU[] = [
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
    for (let i = 0; i < this.inputData.length; i++) {
      this.inputData[i] = {
        timeunit: i + 1,
        workforce: sampleData[i].workforce
      };
      // this.inputData[i] = {
      //   week: i + 1,
      //   workforce: 0
      // };
    }
  }

  formatCost(cost: string): string {
    const array: { demand: string, value: string }[] = JSON.parse(cost);
    let str = '';

    array.forEach(element => {
      const demand = element.demand;
      const cost = element.value;

      str += ` (${demand}, ${cost}) `;
    });
    return str;
  }

  ngOnInit() {
  }
  
  onShowDoc() {
    this.showDocumentation = !this.showDocumentation;
  }
  
  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnitLabel = timeUnit.label;
  }
  
  onNext() {
    this.inputDataStep++;
    this.initInputDataArray();
  }

  onSolve() {
    this.inputDataStep++;
    const model: Model = {
      manpowerExcessCost: this.manpowerExcessCost,
      newEmployeeFixedCost: this.newEmployeeFixedCost,
      newEmployeePerTUCost: this.newEmployeePerWeekCost,
      initialNumberOfEmployees: this.initialEmployees,
      fireEmployeeCost: this.fireEmployeeCost,
      quitEmployees: this.quitEmployees,
      workforcePerTU: this.inputData
    };

    this.solver.solve(model);
  }
  
}