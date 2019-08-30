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
  private model: Model;
  private timeToAnalyse: number;
  inputDataStep: number;
  _timeUnitId: number; // Just to set a sample's time unit
  timeUnitLabel: string;
  showDocumentation: boolean;
  showExamplePopup: boolean;
  
  constructor() {
    this.solver = new WMSolver();
    this.pageDocumentation = this.createDocArray();
    this.model = this.newModel();
    this.timeToAnalyse = 0;
    this.inputDataStep = 0;
    this._timeUnitId = -1;
    this.timeUnitLabel = '';
    this.showDocumentation = false;
    this.showExamplePopup = false;
  }
  
  private newModel(): Model {
    return {
      manpowerExcessCost: 0,
      newEmployeeFixedCost: 0,
      newEmployeePerTUCost: 0,
      initialNumberOfEmployees: 0,
      fireEmployeeCost: 0,
      quitEmployeesPerTU: 0,
      workforcePerTU: []
    };
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
    const inputData: WorkforcePerTU[] = Array(this.timeToAnalyse);
    
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
    
    switch(n) {
      case 1:
          this._timeUnitId = 1;
          this.timeToAnalyse = 5;
          this.model.manpowerExcessCost = 300;
          this.model.newEmployeeFixedCost = 400;
          this.model.newEmployeePerTUCost = 200;
          this.model.initialNumberOfEmployees = 0;
          this.model.fireEmployeeCost = 0;
          this.model.quitEmployeesPerTU = 0;
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
          this._timeUnitId = 3;
          this.timeToAnalyse = 5;
          this.model.manpowerExcessCost = 0;
          this.model.newEmployeeFixedCost = 9000;
          this.model.newEmployeePerTUCost = 108000;
          this.model.initialNumberOfEmployees = 30;
          this.model.fireEmployeeCost = 25000;
          this.model.quitEmployeesPerTU = 3;
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
    const inputData: WorkforcePerTU[] = Array(this.timeToAnalyse);
    
    for (let i = 0; i < inputData.length; i++) {
      inputData[i] = {
        timeunit: i + 1,
        workforce: sampleData[i].workforce
      };
    }
    this.model.workforcePerTU = inputData;
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
  
  onExampleButtonClick() {
    this.showExamplePopup = !this.showExamplePopup;
  }
  
  onExampleClick(e: MouseEvent) {
    const target: HTMLElement = e.target as HTMLElement;
    const number: number = parseInt(target.dataset['number']);
    
    this.setExample(number);
    this.showExamplePopup = false;
    this.inputDataStep++;
    this.onSolve();
  }
  
  onResetClick() {
    this.model = this.newModel();
    this.timeToAnalyse = 0;
    this.inputDataStep = 0;
    this._timeUnitId = -1;
    this.showDocumentation = false;
    this.showExamplePopup = false;
  }
  
  onShowDoc() {
    this.showDocumentation = !this.showDocumentation;
  }
  
  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnitLabel = timeUnit.label;
  }
  
  onNext() {
    // The step is 1 at this point
    this.inputDataStep = (this.inputDataStep < 1) ? 1 : this.inputDataStep;
    this.initInputDataArray();
  }

  onSolve() {
    this.solver.solve(this.model);
    
    // The step is 2 at this point
    this.inputDataStep =  (this.inputDataStep < 2) ? 2 : this.inputDataStep;
  }
  
}