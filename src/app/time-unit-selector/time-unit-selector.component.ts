import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TimeUnit } from '../model/TimeUnit';

@Component({
  selector: 'app-time-unit-selector',
  templateUrl: './time-unit-selector.component.html',
  styleUrls: ['./time-unit-selector.component.css']
})
export class TimeUnitSelectorComponent implements OnInit {
  
  @Output()
  readonly valueChanged: EventEmitter<TimeUnit>;
  readonly timeUnits: TimeUnit[];
  selectedValue: TimeUnit;
  
  constructor() {
    this.valueChanged = new EventEmitter();
    this.timeUnits = [
      { id: 0, label: 'Days' },
      { id: 1, label: 'Weeks' },
      { id: 2, label: 'Months' },
      { id: 3, label: 'Years' }
    ];
    this.selectedValue = this.timeUnits[1];
  }

  ngOnInit() {
    this.onChange();
  }
  
  onChange() {
    this.valueChanged.emit(this.selectedValue);
  }
  
}