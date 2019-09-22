import { Component, OnInit, Input } from '@angular/core';

export interface OptionsBarListener {
  onShowExample(n: number): void;
  onReset(): void;
  onToggleDocumentation(): void;
}

@Component({
  selector: 'app-options-bar',
  templateUrl: './options-bar.component.html',
  styleUrls: ['./options-bar.component.css']
})
export class OptionsBarComponent implements OnInit {
  
  showExamplePopup: boolean;
  @Input()
  readonly examplesNumber: number;
  @Input()
  readonly l: OptionsBarListener;
  
  constructor() {
    this.showExamplePopup = false;
  }
  
  ngOnInit() {}
  
  onExampleButtonClick() {
    this.showExamplePopup = !this.showExamplePopup;
  }
  
  onExampleClick(e: MouseEvent) {
    const target: HTMLElement = e.target as HTMLElement;
    const number: number = parseInt(target.dataset['number']);
    
    this.showExamplePopup = false;
    this.l.onShowExample(number);
  }
  
  onReset() {
    this.l.onReset();
  }
  
  onShowDoc() {
    this.l.onToggleDocumentation();
  }
  
  onPopupTouchoutClick() {
    this.showExamplePopup = false;
  }
  
  getNArray(): number[] {
    return Array(this.examplesNumber).fill(0).map((_v, i) => i);
  }
}