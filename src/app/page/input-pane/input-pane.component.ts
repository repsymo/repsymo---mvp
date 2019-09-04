import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { TimeUnit } from 'src/app/model/TimeUnit';

export interface TimeUnitDependentLabel {
  text?: string,
  part1?: string,
  part2?: string
}

/**
 * Input complement that has an input element and an associated checkbox.
 */
export interface CheckboxInputItem {
  /**
   * Label to show on this input.
   */
  label: TimeUnitDependentLabel,
  
  /**
   * Key in which the checkbox value is found on the passed model, the bind for the checkbox is then
   * assigned with the next property 'checkboxChildKey'. For example, the checkbox will be binded to
   * 'model[checkboxParentKey][checkboxChildKey]'.
   */
  checkboxParentKey: string,
  
  /**
   * See InputItem.checkboxParentKey.
   */
  checkboxChildKey: string
}

/**
 * Input that has an input element.
 */
export interface InputItem {
  /**
   * Key value to bind the input data to this item, belonging to the passed model. It means that, this
   * item is binded to 'model[mkey]'.
   */
  mkey: string,
  
  /**
   * Label to show on this input.
   */
  label: TimeUnitDependentLabel,
  
  /**
   * Checkbox to add to this input.
   */
  checkbox?: CheckboxInputItem,
  
  /**
   * Hint for the input element.
   */
  hint?: TimeUnitDependentLabel,
  
  /**
   * If true, the label of this input will be rendered as two lines label for the grid view,
   * so it matches the height of the current row if required.
   */
  twoLinesLabel?: boolean;
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