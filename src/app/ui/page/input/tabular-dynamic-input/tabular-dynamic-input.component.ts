import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabular-dynamic-input',
  templateUrl: './tabular-dynamic-input.component.html',
  styleUrls: ['./tabular-dynamic-input.component.css']
})
export class TabularDynamicInputComponent implements OnInit {
  
  readonly keys: any;
  @Input()
  rkey: string;
  @Input()
  header: string[];
  @Input()
  rows: object[];
  
  constructor() {
    this.keys = Object.keys;
  }
  
  ngOnInit() {}
  
}