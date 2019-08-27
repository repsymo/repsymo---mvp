import { Component, OnInit } from '@angular/core';
import { WMSolver, Model, WorkforcePerWeek } from '../solver/WMSolver';

@Component({
  selector: 'app-wm',
  templateUrl: './wm.component.html',
  styleUrls: ['./wm.component.css'],
  host: { 'class': 'page' }
})
export class WmComponent implements OnInit {

  private readonly solver: WMSolver;
  private inputDataStep: number;
  private timeWeeks: number;
  private manpowerExcessCost: number;
  private newEmployeeFixedCost: number;
  private newEmployeePerWeekCost: number;
  private initialEmployees: number;
  private fireEmployeeCost: number;
  private quitEmployees: number;
  private inputData: WorkforcePerWeek[];
  
  constructor() {
    this.solver = new WMSolver();
    this.inputDataStep = 0;
    this.timeWeeks = 5;
    this.manpowerExcessCost = 0;
    this.newEmployeeFixedCost = 9000;
    this.newEmployeePerWeekCost = 108000;
    this.initialEmployees = 30;
    this.fireEmployeeCost = 25000;
    this.quitEmployees = 3;
    this.inputData = null;
  }
  
  initInputDataArray() {
    this.inputData = Array(this.timeWeeks);
    const sampleData: WorkforcePerWeek[] = [
      {
        week: 1,
        workforce: 28
      },
      {
        week: 2,
        workforce: 30
      },
      {
        week: 3,
        workforce: 25
      },
      {
        week: 4,
        workforce: 29
      },
      {
        week: 5,
        workforce: 20
      }
    ]
    for(let i = 0; i < this.inputData.length; i++) {
      this.inputData[i] = {
        week: i + 1,
        workforce: sampleData[i].workforce
      };
      // this.inputData[i] = {
      //   week: i + 1,
      //   workforce: 0
      // };
    }
  }
  
  formatCost(cost: string): string {
    const array = JSON.parse(cost);
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
  
  onNext() {
    this.inputDataStep++;
    this.initInputDataArray();
  }
  
  onSolve() {
    this.inputDataStep++;
    const model: Model = {
      manpowerExcessCost: this.manpowerExcessCost,
      newEmployeeFixedCost: this.newEmployeeFixedCost,
      newEmployeePerWeekCost: this.newEmployeePerWeekCost,
      initialNumberOfEmployees: this.initialEmployees,
      fireEmployeeCost: this.fireEmployeeCost,
      quitEmployees: this.quitEmployees,
      workforceWeeks: this.inputData
    }
    
    this.solver.solve(model);
  }
}