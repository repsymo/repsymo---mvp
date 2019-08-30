import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input()
  set value(value: number) {
    if(value >= 0 && value < this.timeUnits.length) {
      this.selectedValue = this.timeUnits[value];
      this.onChange();
    }
  }
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