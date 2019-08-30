import { Component, OnInit, Input } from '@angular/core';

export interface Example {
  number: number,
  statement: string
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
  set value(example: Example) {console.log(example);
  
    this.example = example;
    this.gone = example.number == -1;
  }
  
  constructor() { }
  
  ngOnInit() {
  }
  
}