import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chain-item',
  templateUrl: './chain-item.component.html',
  styleUrls: ['./chain-item.component.css']
})
export class ChainItemComponent implements OnInit {
  
  @Input()
  value: string;
  
  constructor() {}
  
  ngOnInit() {}
  
}