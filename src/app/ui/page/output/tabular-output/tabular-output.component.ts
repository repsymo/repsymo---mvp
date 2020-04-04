import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabular-output',
  templateUrl: './tabular-output.component.html',
  styleUrls: ['./tabular-output.component.css']
})
export class TabularOutputComponent implements OnInit {
  
  @Input()
  readonly header: string[];
  @Input()
  readonly rows: object[];
  
  constructor() {}
  
  ngOnInit() {}
  
  keys(object: object): any {
    return Object.keys(object);
  }
  
}