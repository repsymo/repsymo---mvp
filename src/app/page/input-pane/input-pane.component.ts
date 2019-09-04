import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TimeUnit } from 'src/app/model/TimeUnit';

export interface TimeUnitDependentLabel {
  text?: string,
  part1?: string,
  part2?: string
}

export interface InputItem {
  mkey: string,
  label: TimeUnitDependentLabel,
  hint?: TimeUnitDependentLabel,
  checkbox?: TimeUnitDependentLabel,
  checkboxValue?: boolean
}

@Component({
  selector: 'app-input-pane',
  templateUrl: './input-pane.component.html',
  styleUrls: ['./input-pane.component.css']
})
export class InputPaneComponent implements OnInit {
  
  private readonly cdr: ChangeDetectorRef
  private timeUnit: TimeUnit;
  @Input()
  readonly items: InputItem[];
  @Input()
  readonly model: object;
  @Output()
  readonly timeUnitChange: EventEmitter<TimeUnit>;
  
  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
    this.timeUnit = null;
    this.timeUnitChange = new EventEmitter();
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }
  
  onTimeUnitChange(timeUnit: TimeUnit) {
    this.timeUnit = timeUnit;
    this.timeUnitChange.emit(timeUnit);
  }
  
  getTUDLText(item: TimeUnitDependentLabel) {
    if(!item) return '';
    const tu = this.timeUnit.label.toLowerCase();
    const isNormalText = typeof item.text == 'string';
    return (isNormalText) ? item.text : item.part1 + tu + item.part2;
  }
  
}