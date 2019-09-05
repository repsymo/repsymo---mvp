import { of, Subscription } from 'rxjs';
import { OnInit, OnDestroy } from '@angular/core';
import { IoService } from '../io.service';
import { DDPPSFile } from '../model/DDPPSolverFile';
import { version } from '../../../package.json';
import { Example } from './example-statement/example-statement.component';

export abstract class Page implements OnInit, OnDestroy {
  
  private static readonly APP_VERSION: string = version;
  private readonly ioService: IoService;
  private readonly modelType: string;
  private problemName: string;
  private ioSubscription: Subscription;
  
  constructor(ioService: IoService, modelLabel: string) {
    this.ioService = ioService;
    this.modelType = modelLabel;
    this.problemName = 'DDPPSolver problem';
    this.ioSubscription = null;
  }
  
  abstract getModel(): object;
  abstract getExample(): Example;
  abstract loadModel(modelObj: object, fileName: string, statement: string): boolean;
  abstract onSolve(): void;
  abstract onReset(): void;
  
  ngOnInit() {
    let f = false; // fixes the bug of asking to save when changing from tab
    
    this.ioSubscription = this.ioService.io.subscribe(e => {
      if(e == null) return;
      if(!f) return;
      
      switch(e.ioAction) {
        case 'open':
          this.open(e.data, e.name);
          break;
          
        case 'save':
          this.save();
          break;
      }
    });
    f = true;
  }
  
  ngOnDestroy() {
    this.ioSubscription.unsubscribe();
  }
  
  private open(data: DDPPSFile, name: string) {
    if(data.modelType != this.modelType) return;
    if(this.loadModel(data.problemModel, name, data.statement)) {
      this.onSolve();
    }
    else {
      alert(`Invalid ${this.modelType} model`);
    }
  }
  
  private save() {
    const downlaod = (json: string, name: string) => {
      const p = { userDate1: 1, userData2: 2 };
      
      of(p).subscribe(() => {
        const element = document.createElement('a');
        const me = new MouseEvent('click');
        const uri = encodeURIComponent(json);
        
        element.setAttribute('href', `data:text/json;charset=UTF-8,${uri}`);
        element.setAttribute('download', name);
        element.dispatchEvent(me);
      });
    }
    const model = this.getModel();
    console.log('Page save '+this.modelType);
    
    // The model may be empty and had returned null, don't download then
    if(model == null) {
      alert('Model is empty!');
      return;
    }
    const name = prompt('Save problem as', this.problemName);
    
    if(name != null) {
      const stm = this.getExample().statement;
      const statement = prompt('Enter a problem statement (optional)', stm) || '';
      const fileObj: DDPPSFile = {
        appVersion: Page.APP_VERSION,
        modelType: this.modelType,
        statement: statement,
        problemModel: model
      };
      const fileJSON = JSON.stringify(fileObj);
      
      downlaod(fileJSON, `${name}.ddpps`);
    }
  }
  
}