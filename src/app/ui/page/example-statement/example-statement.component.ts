import { Component, OnInit, Input } from '@angular/core';

export interface Example {
  number: number,
  statement: string,
  title?: string
}

@Component({
  selector: 'app-example-statement',
  templateUrl: './example-statement.component.html',
  styleUrls: ['./example-statement.component.css']
})
export class ExampleStatementComponent implements OnInit {
  
  example: Example;
  gone: boolean;
  @Input()
  set value(example: Example) {
    this.example = example;
    if(example.title) {
      example.number = 0;
    }
    this.gone = example.number == -1;
  }
  
  constructor() {}
  
  ngOnInit() {}
  
}