import { Component, OnInit } from '@angular/core';
import { WMSolver, Model, WorkforcePerTU } from '../solver/WMSolver';
import { TimeUnit } from '../model/TimeUnit';

@Component({
  selector: 'app-wm',
  templateUrl: './wm.component.html',
  styleUrls: ['./wm.component.css'],
  host: { class: 'page' }
})
export class WmComponent implements OnInit {
  
  private readonly solver: WMSolver;
  readonly pageDocumentation: string[];
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
  }

  private createDocArray(): string[] {
    return [
      
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