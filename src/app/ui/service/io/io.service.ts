import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DDPPSFile } from '../../../model/DDPPSolverFile';

export interface IOEvent {
  ioAction: string,
  name?: string,
  data?: DDPPSFile
}

@Injectable({
  providedIn: 'root'
})
export class IoService {

  public readonly io: Subject<IOEvent>;

  constructor() {
    this.io = new BehaviorSubject(null);
  }

}
